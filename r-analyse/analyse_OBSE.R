# ==========================================================================
#  OBSE-variabiliteit & Werktevredenheid  -  Stap-voor-stap hypothesetoetsing
#  Dataset: data/DagelijksNLFR_BaselineNLFR.xlsx  (nieuwe dataverzameling)
#
#  Design: Experience Sampling Method (ESM)
#   - Baseline  : trait-vragenlijsten (1 meting per persoon)
#   - Dagelijks : OBSE-state, 4x per dag (10u / 12u / 14u / 16u)
#
#  Hypothesen:
#   H1   : Hoger basisniveau OBSE (trait)  -> hogere werktevredenheid  (positief)
#   H2a  : Meer OBSE-variabiliteit (RVI)   -> lagere werktevredenheid  (negatief)
#   H2b  : RVI verklaart EXTRA variantie in werktevredenheid bovenop OBSE-trait
#   + aanvullend : OBSE gemiddelde state -> werktevredenheid
#
#  METHODE = de gecorrigeerde pipeline uit "Overzicht_analyses_dataset":
#   (1) GEEN reverse-coding van de werktevredenheidsitems.
#       Reden: alle 15 facetitems correleren positief met de schaaltotaal;
#       omkeren van 10/11/15 verlaagt Cronbach's alpha juist. (Zie STAP 2/7.)
#       -> Dit wijkt bewust af van de oude thesis, die 10/11/15 wél omkeerde.
#   (2) Werktevredenheid = gemiddelde van 15 facetitems (1..15).
#       Item 16 = los "overall"-item, apart gerapporteerd (NIET in composiet).
#   (3) RVI = relatieve VARIANTIE (relativeVAR, Mestdagh et al. 2018):
#       var(x) / ((MAX - M) * (M - MIN)), schaal [1, 5].
#   (4) ICC via leeg multilevelmodel met REML = FALSE (ML).
#   (5) Leeftijd wordt NIET gebruikt (kolom bevat onbetrouwbare waarden).
#
#  INCLUSIECRITERIUM (jouw keuze): >= 5 geldige ESM-metingen  -> MIN_METINGEN.
#   Let op: het overzichtsdocument gebruikte >= 26. Deze keuze verandert de
#   H1-conclusie (zie de robuustheidstabel in STAP 12). Pas 1 regel aan om te
#   wisselen.
#
#  Tip in RStudio: open INRYOU-OBSE.Rproj, open dit bestand, en run het
#  blok-per-blok (selecteer een STAP en druk Ctrl+Enter).
# ==========================================================================


# --------------------------------------------------------------------------
# STAP 0 — Instellingen + pakketten
# --------------------------------------------------------------------------
MIN_METINGEN <- 5      # << inclusiedrempel. Document gebruikte 26; jij: 5.

pakketten <- c("readxl", "dplyr", "tidyr", "psych", "lme4")
te_installeren <- pakketten[!pakketten %in% rownames(installed.packages())]
if (length(te_installeren) > 0) install.packages(te_installeren)

library(readxl); library(dplyr); library(tidyr); library(psych); library(lme4)

bestand <- file.path("data", "DagelijksNLFR_BaselineNLFR.xlsx")
stopifnot(file.exists(bestand))


# --------------------------------------------------------------------------
# STAP 1 — Data inladen
# --------------------------------------------------------------------------
dagelijks <- read_excel(bestand, sheet = "Dagelijks")
baseline  <- read_excel(bestand, sheet = "Baseline")
dagelijks <- dagelijks[, colSums(!is.na(dagelijks)) > 0]   # spookkolommen weg
baseline  <- baseline[,  colSums(!is.na(baseline))  > 0]

cat("\n== STAP 1: Ingeladen ==\n")
cat("Dagelijks :", nrow(dagelijks), "rijen |",
    "unieke ID's:", dplyr::n_distinct(dagelijks$ID), "\n")
cat("Baseline  :", nrow(baseline), "personen\n")


# --------------------------------------------------------------------------
# STAP 2 — Schaalscores (alle items 5-punts Likert)
# --------------------------------------------------------------------------
obse_state_items <- grep("^OBSE state_", names(dagelijks), value = TRUE)   # 10

## Een dagelijkse observatie is GELDIG als alle 10 state-items zijn ingevuld
dagelijks <- dagelijks %>%
  mutate(volledig  = rowSums(is.na(across(all_of(obse_state_items)))) == 0,
         OBSE_state = ifelse(volledig,
                             rowMeans(across(all_of(obse_state_items))), NA_real_))

## Baseline-schalen
obse_trait_items <- grep("^OBSE trait_", names(baseline), value = TRUE)     # 10
jobsat_15        <- paste0("Job satisfaction_", 1:15)                       # facet
jobsat_overall   <- "Job satisfaction_16"                                   # overall
pwb_items        <- grep("^PWB_", names(baseline), value = TRUE)            # 18
gse_items        <- grep("^Global self-esteem_", names(baseline), value = TRUE) # 10

## GEEN reverse-coding (zie kop). Werktevredenheid = gemiddelde items 1..15.
baseline <- baseline %>%
  mutate(
    OBSE_trait     = rowMeans(across(all_of(obse_trait_items)), na.rm = TRUE),
    Jobsat_trait   = rowMeans(across(all_of(jobsat_15)),        na.rm = TRUE),
    Jobsat_overall = .data[[jobsat_overall]],                 # item 16, los
    PWB            = rowMeans(across(all_of(pwb_items)),        na.rm = TRUE),
    Globalself     = rowMeans(across(all_of(gse_items)),        na.rm = TRUE)
  )

cat("\n== STAP 2: Schaalscores ==\n")
cat("Werktevredenheid = gemiddelde van 15 facetitems (item 16 apart, GEEN reverse)\n")
cat("Geldige dagelijkse observaties (10/10 items):", sum(dagelijks$volledig), "\n")


# --------------------------------------------------------------------------
# STAP 3 — Datacleaning: >= MIN_METINGEN geldige ESM-metingen
# --------------------------------------------------------------------------
tellingen <- dagelijks %>% filter(volledig) %>%
  group_by(ID) %>% summarise(n_metingen = n(), .groups = "drop")
geldige_ids <- tellingen %>% filter(n_metingen >= MIN_METINGEN) %>% pull(ID)
verwijderd  <- setdiff(tellingen$ID, geldige_ids)

cat("\n== STAP 3: Datacleaning (>=", MIN_METINGEN, "metingen) ==\n")
cat("Voor cleaning:", nrow(tellingen), "| verwijderd:", length(verwijderd),
    if (length(verwijderd)) paste0(" (ID ", paste(sort(verwijderd), collapse=", "), ")") else "",
    "| behouden:", length(geldige_ids), "\n")

dagelijks_clean <- dagelijks %>% filter(ID %in% geldige_ids, volledig)


# --------------------------------------------------------------------------
# STAP 4 — RVI (= RVAR_OBSE): relatieve VARIANTIE per persoon
#   relativeVAR = var(x) / ((MAX - M) * (M - MIN)),  schaal [1, 5].
#   Vereist >= 2 metingen EN variatie > 0 (anders NA).
# --------------------------------------------------------------------------
rvar_obse <- function(x, MIN = 1, MAX = 5) {
  x <- x[!is.na(x)]
  if (length(x) < 2) return(NA_real_)
  if (sd(x) == 0)    return(NA_real_)        # geen variatie -> RVI niet bepaalbaar
  M <- mean(x); maxvar <- (MAX - M) * (M - MIN)
  if (maxvar <= 0) return(NA_real_)
  var(x) / maxvar
}

per_persoon <- dagelijks_clean %>%
  group_by(ID) %>%
  summarise(n_metingen     = n(),
            OBSE_avg_state = mean(OBSE_state),
            OBSE_state_sd  = sd(OBSE_state),
            RVAR_OBSE      = rvar_obse(OBSE_state),
            .groups = "drop")

cat("\n== STAP 4: OBSE-variabiliteit (RVAR_OBSE) ==\n")
cat("RVI berekend voor", sum(!is.na(per_persoon$RVAR_OBSE)), "van", nrow(per_persoon),
    "| NA (geen variatie):", sum(is.na(per_persoon$RVAR_OBSE)), "\n")
cat("Bereik:", round(min(per_persoon$RVAR_OBSE, na.rm=TRUE),3), "..",
    round(max(per_persoon$RVAR_OBSE, na.rm=TRUE),3), "(theoretisch 0..1)\n")


# --------------------------------------------------------------------------
# STAP 5 — Analyse-dataset op persoonsniveau (data_wide)
#   NB: personen zonder variatie houden RVI = NA -> zij vallen enkel weg in de
#   RVI-modellen (H2a/H2b), niet in H1. Extra uitval komt door ontbrekende
#   baselinewaarden (missing data) -> als BEPERKING noteren, niet als cleaning.
# --------------------------------------------------------------------------
data_wide <- per_persoon %>%
  left_join(baseline %>% select(ID, Taal, OBSE_trait, Jobsat_trait,
                                Jobsat_overall, PWB, Globalself),
            by = "ID")

cat("\n== STAP 5: data_wide ==\n")
cat("Personen:", nrow(data_wide),
    "| compleet voor H1:", sum(!is.na(data_wide$OBSE_trait) & !is.na(data_wide$Jobsat_trait)),
    "| compleet voor RVI-modellen:",
    sum(!is.na(data_wide$OBSE_trait) & !is.na(data_wide$Jobsat_trait) & !is.na(data_wide$RVAR_OBSE)), "\n")


# --------------------------------------------------------------------------
# STAP 6 — Beschrijvend + correlatie trait vs. gemiddelde state
# --------------------------------------------------------------------------
cat("\n== STAP 6: Beschrijvend ==\n")
print(psych::describe(data_wide[, c("OBSE_trait","OBSE_avg_state","RVAR_OBSE",
                                    "Jobsat_trait","Jobsat_overall","PWB","Globalself")]))
cat("\nCorrelatie OBSE_trait <-> OBSE_avg_state:\n")
print(cor.test(data_wide$OBSE_trait, data_wide$OBSE_avg_state, use = "complete.obs"))
cat("Correlatie item16 (overall) <-> 15-item composiet:\n")
print(cor(data_wide$Jobsat_overall, data_wide$Jobsat_trait, use = "complete.obs"))


# --------------------------------------------------------------------------
# STAP 7 — Betrouwbaarheid (Cronbach's alpha) + reverse-check
# --------------------------------------------------------------------------
cat("\n== STAP 7: Cronbach's alpha ==\n")
bas_clean <- baseline[baseline$ID %in% geldige_ids, ]
a_state <- psych::alpha(dagelijks_clean[, obse_state_items], warnings = FALSE)
a_trait <- psych::alpha(bas_clean[, obse_trait_items], warnings = FALSE)
a_job   <- psych::alpha(bas_clean[, jobsat_15],        warnings = FALSE)
cat("OBSE-state alpha =", round(a_state$total$raw_alpha,3),
    "| OBSE-trait alpha =", round(a_trait$total$raw_alpha,3),
    "| Jobsat(15) alpha =", round(a_job$total$raw_alpha,3), "\n")
# Bewijs dat NIET omkeren juist is: item-totaalcorrelaties horen positief te zijn
cat("Item-restcorrelaties Jobsat (moeten allemaal > 0 zijn):\n")
print(round(a_job$item.stats$r.drop, 2))


# --------------------------------------------------------------------------
# STAP 8 — ICC (leeg multilevelmodel, REML = FALSE)
# --------------------------------------------------------------------------
cat("\n== STAP 8: ICC ==\n")
m0 <- lmer(OBSE_state ~ 1 + (1 | ID), data = dagelijks_clean, REML = FALSE)
vc <- as.data.frame(VarCorr(m0))
vb <- vc$vcov[vc$grp == "ID"]; vw <- vc$vcov[vc$grp == "Residual"]
cat("tussen =", round(vb,3), "| binnen =", round(vw,3),
    "| ICC =", round(vb/(vb+vw),3), "\n")


# --------------------------------------------------------------------------
#  Hulpfunctie voor een leesbaar hypothese-oordeel
# --------------------------------------------------------------------------
oordeel <- function(p, coef, richting) {
  sig <- !is.na(p) && p < .05
  ok  <- (richting=="positief" && coef>0) || (richting=="negatief" && coef<0)
  if (sig && ok)  sprintf("ONDERSTEUND (p = %.3f, %s zoals verwacht)", p, richting)
  else if (sig)   sprintf("NIET ondersteund (significant p = %.3f, TEGENGESTELDE richting)", p)
  else            sprintf("NIET ondersteund (niet significant, p = %.3f)", p)
}


# --------------------------------------------------------------------------
# STAP 9 — HYPOTHESE 1: OBSE_trait -> Jobsat_trait (verwacht positief)
# --------------------------------------------------------------------------
cat("\n==================== HYPOTHESE 1 ====================\n")
model_1 <- lm(Jobsat_trait ~ OBSE_trait, data = data_wide)
print(summary(model_1)); print(confint(model_1))
c1 <- coef(summary(model_1))["OBSE_trait", ]
cat("\n>>> H1:", oordeel(c1["Pr(>|t|)"], c1["Estimate"], "positief"), "\n")

cat("\n---- Aanvullend: OBSE_avg_state -> Jobsat_trait ----\n")
model_1b <- lm(Jobsat_trait ~ OBSE_avg_state, data = data_wide)
print(summary(model_1b)); print(confint(model_1b))
c1b <- coef(summary(model_1b))["OBSE_avg_state", ]
cat("\n>>> Aanvullend:", oordeel(c1b["Pr(>|t|)"], c1b["Estimate"], "positief"), "\n")


# --------------------------------------------------------------------------
# STAP 10 — HYPOTHESE 2a: RVAR_OBSE -> Jobsat_trait (verwacht negatief)
# --------------------------------------------------------------------------
cat("\n==================== HYPOTHESE 2a ====================\n")
model_2 <- lm(Jobsat_trait ~ RVAR_OBSE, data = data_wide)
print(summary(model_2)); print(confint(model_2))
c2 <- coef(summary(model_2))["RVAR_OBSE", ]
cat("\n>>> H2a:", oordeel(c2["Pr(>|t|)"], c2["Estimate"], "negatief"), "\n")


# --------------------------------------------------------------------------
# STAP 11 — HYPOTHESE 2b: RVAR_OBSE bovenop OBSE_trait
#   Formele modelvergelijking op DEZELFDE N (rijen met alle 3 aanwezig).
# --------------------------------------------------------------------------
cat("\n==================== HYPOTHESE 2b ====================\n")
sub <- data_wide %>% filter(!is.na(OBSE_trait), !is.na(Jobsat_trait), !is.na(RVAR_OBSE))
model_1_same <- lm(Jobsat_trait ~ OBSE_trait, data = sub)             # zelfde N
model_3      <- lm(Jobsat_trait ~ OBSE_trait + RVAR_OBSE, data = sub)
print(summary(model_3)); print(confint(model_3))
cat("\nModelvergelijking H1 vs H2b (zelfde N =", nrow(sub), "):\n")
print(anova(model_1_same, model_3))
dR2   <- summary(model_3)$r.squared - summary(model_1_same)$r.squared
p_inc <- anova(model_1_same, model_3)$`Pr(>F)`[2]
cat(sprintf("\ndR2 = %.3f (p = %.3f)\n", dR2, p_inc))
c3 <- coef(summary(model_3))["RVAR_OBSE", ]
cat(">>> H2b:", if (!is.na(p_inc) && p_inc < .05 && c3["Estimate"] < 0)
      sprintf("ONDERSTEUND (RVAR voegt significant negatief effect toe, p = %.3f)", p_inc)
    else sprintf("NIET ondersteund (RVAR voegt geen significante variantie toe, p = %.3f)", p_inc), "\n")


# --------------------------------------------------------------------------
# STAP 12 — ROBUUSTHEID: H1 bij verschillende inclusiedrempels
#   Toont expliciet of de H1-conclusie aan de drempel hangt.
# --------------------------------------------------------------------------
cat("\n==================== ROBUUSTHEID H1 ====================\n")
drempel_check <- function(thr) {
  ids <- tellingen %>% filter(n_metingen >= thr) %>% pull(ID)
  dc  <- dagelijks %>% filter(ID %in% ids, volledig)
  pp  <- dc %>% group_by(ID) %>% summarise(OBSE_avg_state = mean(OBSE_state), .groups="drop")
  dw  <- pp %>% left_join(baseline %>% select(ID, OBSE_trait, Jobsat_trait), by="ID") %>%
    filter(!is.na(OBSE_trait), !is.na(Jobsat_trait))
  m <- lm(Jobsat_trait ~ OBSE_trait, data = dw)
  s <- coef(summary(m))["OBSE_trait", ]
  data.frame(drempel = thr, N = nrow(dw),
             B = round(s["Estimate"],3), p = round(s["Pr(>|t|)"],3),
             sig = ifelse(s["Pr(>|t|)"] < .05, "JA", "nee"))
}
print(do.call(rbind, lapply(c(26, 10, 5, 1), drempel_check)), row.names = FALSE)
cat("(Jouw hoofdanalyse gebruikt drempel =", MIN_METINGEN, ")\n")


# --------------------------------------------------------------------------
# STAP 13 — EXPLORATIEF: psychologisch welzijn (PWB)  [OPTIONEEL]
#   Status per overzichtsdocument: nog niet formeel heruitgevoerd -> af te
#   stemmen met promotor. Voorzichtig rapporteren als exploratief.
#   NB: PWB (Ryff) en Globalself (Rosenberg) bevatten origineel reverse-items;
#   hier als eenvoudige itemgemiddelden (zoals in Analyse_samenvatting).
# --------------------------------------------------------------------------
cat("\n==================== EXPLORATIEF: PWB (optioneel) ====================\n")
print(summary(lm(PWB ~ Globalself,            data = data_wide)))
print(summary(lm(PWB ~ RVAR_OBSE,             data = data_wide)))
print(summary(lm(PWB ~ RVAR_OBSE + Globalself, data = data_wide)))


# --------------------------------------------------------------------------
# STAP 14 — Overzichtstabel + export
# --------------------------------------------------------------------------
pak <- function(m, term) {
  s <- summary(m)$coefficients
  if (!term %in% rownames(s)) return(c(B=NA, p=NA))
  c(B = unname(s[term,"Estimate"]), p = unname(s[term,"Pr(>|t|)"]))
}
overzicht <- rbind(
  "H1  Jobsat ~ OBSE_trait"        = c(pak(model_1,"OBSE_trait"),      R2=summary(model_1)$r.squared),
  "aanv Jobsat ~ OBSE_avg_state"   = c(pak(model_1b,"OBSE_avg_state"), R2=summary(model_1b)$r.squared),
  "H2a Jobsat ~ RVAR_OBSE"         = c(pak(model_2,"RVAR_OBSE"),       R2=summary(model_2)$r.squared),
  "H2b Jobsat ~ RVAR+trait"        = c(pak(model_3,"RVAR_OBSE"),       R2=summary(model_3)$r.squared))
overzicht <- as.data.frame(round(overzicht,3))
overzicht$sig <- ifelse(overzicht$p < .05, "JA", "nee")
cat("\n==================== OVERZICHT (drempel", MIN_METINGEN, ") ====================\n")
print(overzicht)

if (!dir.exists("output")) dir.create("output")
write.csv(data_wide, file.path("output","data_wide.csv"), row.names = FALSE)
write.csv(overzicht, file.path("output","overzicht_modellen.csv"))
cat("\n== KLAAR ==  (output/data_wide.csv, output/overzicht_modellen.csv)\n")
