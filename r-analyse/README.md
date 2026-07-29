# OBSE-variabiliteit & Werktevredenheid — analyse in RStudio

Stap-voor-stap toetsing van de thesis-hypothesen op de **nieuwe dataverzameling**
(`DagelijksNLFR_BaselineNLFR.xlsx`), met de gecorrigeerde methode uit het
overzichtsdocument.

## Zo run je het in RStudio

1. Open **`INRYOU-OBSE.Rproj`** (dan staat de werkmap juist).
2. Open **`analyse_OBSE.R`**.
3. De eerste keer worden ontbrekende pakketten automatisch geïnstalleerd
   (`readxl`, `dplyr`, `tidyr`, `psych`, `lme4`).
4. Run het script **blok per blok** (selecteer een `STAP …`-blok en druk
   `Ctrl+Enter`), of in één keer met **Source** (`Ctrl+Shift+S`).
5. Elke STAP print zijn eigen resultaat. Output-bestanden komen in `output/`.

De inclusiedrempel staat bovenaan in één regel: `MIN_METINGEN <- 5`.

## Mapstructuur

```
r-analyse/
├── INRYOU-OBSE.Rproj        # open dit in RStudio
├── analyse_OBSE.R           # het volledige stap-voor-stap script
├── data/
│   └── DagelijksNLFR_BaselineNLFR.xlsx
└── output/                  # wordt aangemaakt bij het runnen
```

## Belangrijkste methodekeuzes (gecorrigeerd t.o.v. de oude thesis)

| Keuze | Deze analyse | Oude thesis | Reden |
|---|---|---|---|
| Reverse-coding Jobsat 10/11/15 | **Niet** omkeren | Wél omkeren | Alle 15 item-restcorrelaties zijn positief; omkeren verlaagt Cronbach's α. De omkering in de thesis was een klein-steekproef-artefact. |
| Werktevredenheid | Gemiddelde **items 1–15** | 16 items | Item 16 is een los "overall"-item (Warr et al., 1979), hoort niet in de composiet. |
| RVI | relatieve **variantie** (`relativeVAR`) | idem idee | Sluit aan bij het overzichtsdocument (range ~0–0.13). |
| ICC | `lmer(..., REML = FALSE)` | — | Zoals in het overzichtsdocument. |
| Leeftijd | Niet gebruikt | — | Kolom bevat onbetrouwbare waarden. |
| Inclusie | **≥ 5 metingen** (jouw keuze) | ≥ 5 (thesis) / ≥ 26 (document) | Zie robuustheid hieronder. |

## Resultaten op jouw drempel (≥ 5), N = 73

| Hypothese | Model | B | p | Ondersteund? |
|---|---|---|---|---|
| **H1**  OBSE-trait → werktevredenheid | `Jobsat ~ OBSE_trait` | 0.20 | **.055** | Net niet |
| aanv.  gem. state → werktevredenheid | `Jobsat ~ OBSE_avg_state` | 0.19 | .145 | Nee |
| **H2a**  RVI → werktevredenheid | `Jobsat ~ RVAR_OBSE` | 1.69 | .333 | Nee |
| **H2b**  RVI bovenop trait (increment) | `Jobsat ~ RVAR + trait` | ΔR²=.017 | .266 | Nee |

Betrouwbaarheid: α(state) ≈ .90, α(trait) ≈ .85, α(jobsat-15) ≈ .80.
ICC ≈ .57 (≈57% van de variantie in state-OBSE ligt tussen personen).
Correlatie trait ↔ gemiddelde state: r ≈ .31.

## De cruciale vergelijking met het overzichtsdocument

Je vroeg het document mee te nemen **tot de berekeningen** en dan kritisch te
vergelijken. Twee dingen:

**1. Het document is reproduceerbaar en intern correct.** Op zijn eigen drempel
(≥ 26, N = 52) haal ik exact hun cijfers: H1 B=0.36, p=.016, R²=.111; ICC=.579;
α's .914/.800/.841; RVI-range 0–0.13. De methodekeuzes (geen reverse-coding,
15 items) zijn goed onderbouwd en verbeteren de meting — ik heb ze overgenomen.

**2. Eén keuze bepaalt de H1-conclusie: de inclusiedrempel.** Zelfde pipeline,
alleen de drempel verschilt:

| Drempel | N | H1 (OBSE-trait → werktevredenheid) |
|---|---|---|
| ≥ 26 (document) | 52 | B=0.36, **p=.016 — significant** |
| ≥ 10 | 67 | B=0.28, **p=.022 — significant** |
| **≥ 5 (jouw keuze)** | 73 | B=0.20, **p=.055 — net niet** |
| ≥ 1 | 80 | B=0.24, **p=.010 — significant** |

> Op **elke** drempel behalve precies ≥ 5 is H1 significant. Bij ≥ 5 zit p net
> boven .05. Dit is dus geen robuuste "niet-ondersteund", maar een grensgeval
> dat volledig afhangt van de datacleaning-keuze. **Bespreek deze drempel
> bewust** (bij voorkeur vooraf vastgelegd / met je promotor), want het is het
> verschil tussen "H1 ondersteund" en "net niet".

H2a en H2b zijn op álle drempels niet-significant — die conclusie is wél robuust.

## Belangrijk om te noteren in je thesis
- De extra uitval in de regressies komt door **ontbrekende baselinewaarden**
  (missing data), niet door de datacleaning.
- De exploratieve PWB-analyses (STAP 13) staan als **optioneel/exploratief** in
  het script; volgens het overzichtsdocument nog af te stemmen met je promotor.
