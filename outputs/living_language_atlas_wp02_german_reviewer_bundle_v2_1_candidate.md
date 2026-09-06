# Living Language Atlas — German Reviewer Bundle v2.1 Candidate

This bundle is generated from the canonical candidate JSON. It separates language, pedagogy/evidence, provenance/license, and audio decisions. No candidate status below implies human approval.

## Gate status

- Release: `BLOCKED_PENDING_HUMAN_REVIEW`
- Qualified German sign-off: PENDING (external feedback integrated; reviewer credentials not supplied)
- Pedagogy/evidence review: PENDING
- Project content-license decision: PROPRIETARY / ALL RIGHTS RESERVED (owner decision recorded)
- Recorded-audio review: NOT APPLICABLE UNTIL RECORDING
- Fixture execution: NOT RUN — NO EVALUATOR IMPLEMENTATION

## Reviewer instructions

Language reviewers should judge each German string in its stated scene and keep intent, grammatical form, and register separate. Pedagogy reviewers should verify support classification, evidence capability, changed context, lane, familiarity, answer-reveal contamination, and delayed-return eligibility. Do not promote reviewer-pending variants into automatic release evidence.

## Language review — rubric candidates

### RUBRIC-DE-N1-REQ-01 — GER-SVC-REQUEST-ONE-01

Canonical candidate: `Einen Kaffee, bitte.` (A coffee, please.)

| ID | German form | Intended item | Teaching role | Attempt | Intent | Form | Register | Error codes | Notes | Decision |
|---|---|---|---|---|---|---|---|---|---|---|
| VAR-DE-N1-01 | Einen Kaffee, bitte. | LEX-DE-001 | ACTIVE_TARGET | accepted_clean | achieved | acceptable | appropriate |  | Exact canonical candidate with standard punctuation. | ☐ approve ☐ revise ☐ reject |
| VAR-DE-N1-02 | Einen Kaffee bitte | LEX-DE-001 | PASSIVE_ACCEPTED | accepted_clean | achieved | acceptable | appropriate |  | Comma omitted before bitte in formulaic closing chunk under official §72 allowance; accepted clean. | ☐ approve ☐ revise ☐ reject |
| VAR-DE-N1-03 | Guten Tag, einen Kaffee, bitte. | LEX-DE-001 | PASSIVE_ACCEPTED | accepted_clean | achieved | acceptable | appropriate |  | Formal greeting prepended; register and naturalness pending human review. | ☐ approve ☐ revise ☐ reject |
| VAR-DE-N1-04 | Hallo, einen Kaffee, bitte. | LEX-DE-001 | PASSIVE_ACCEPTED | accepted_clean | achieved | acceptable | appropriate |  | Friendly greeting prepended; naturalness pending human review. | ☐ approve ☐ revise ☐ reject |
| VAR-DE-N1-05 | Ich möchte einen Kaffee, bitte. | LEX-DE-001 | PASSIVE_ACCEPTED | accepted_clean | achieved | acceptable | appropriate |  | Polite modal frame accepted as passive candidate; human review pending. | ☐ approve ☐ revise ☐ reject |
| VAR-DE-N1-06 | Ich hätte gern einen Kaffee, bitte. | LEX-DE-001 | PASSIVE_ACCEPTED | accepted_clean | achieved | acceptable | appropriate |  | Polite subjunctive II frame accepted as passive candidate; human review pending. | ☐ approve ☐ revise ☐ reject |
| VAR-DE-N1-07 | Ein Kaffee, bitte. | LEX-DE-001 | REVIEW_REQUIRED_NONCANONICAL | accepted_minor | achieved | minor_issue | appropriate | ARTICLE_GENDER_CASE | Nominative substitution; intent achieved; exact form severity pending human review. | ☐ approve ☐ revise ☐ reject |
| VAR-DE-N1-08 | Einen Tee, bitte. | LEX-DE-002 | ACTIVE_TARGET | accepted_clean | achieved | acceptable | appropriate |  | Canonical request for Tee target. | ☐ approve ☐ revise ☐ reject |
| VAR-DE-N1-09 | Einen Apfelsaft, bitte. | LEX-DE-003 | ACTIVE_TARGET | accepted_clean | achieved | acceptable | appropriate |  | Canonical request for Apfelsaft target. | ☐ approve ☐ revise ☐ reject |
| VAR-DE-N1-10 | Einen Apfelsaft bitte | LEX-DE-003 | PASSIVE_ACCEPTED | accepted_clean | achieved | acceptable | appropriate |  | Comma omitted for Apfelsaft target; accepted clean under §72. | ☐ approve ☐ revise ☐ reject |
| VAR-DE-N1-11 | Ein Apfelsaft, bitte. | LEX-DE-003 | REVIEW_REQUIRED_NONCANONICAL | accepted_minor | achieved | minor_issue | appropriate | ARTICLE_GENDER_CASE | Nominative substitution for Apfelsaft; intent achieved; form classification pending review. | ☐ approve ☐ revise ☐ reject |
| VAR-DE-N1-12 | Ich moechte einen Kaffee, bitte. | LEX-DE-001 | PASSIVE_ACCEPTED | accepted_minor | achieved | minor_issue | appropriate | KEYBOARD_CONSTRAINT | Target-specific ASCII fallback (oe -> ö); communicative intent achieved without orthography credit. | ☐ approve ☐ revise ☐ reject |
| NONCAN-DE-N1-01 | Kaffee! | LEX-DE-001 | OFF_TASK | failed_critical | partial | minor_issue | mismatch | MISSING_POLITENESS_MARKER | Missing determiner and politeness marker; inadequate for polite adult service counter. | ☐ approve ☐ revise ☐ reject |
| NONCAN-DE-N1-02 | Ich will einen Kaffee. | LEX-DE-001 | REJECTED_NONCANONICAL | failed_critical | achieved | acceptable | mismatch | REGISTER_TOO_DIRECT | Grammatically well-formed and semantically clear, but 'Ich will ...' is too demanding for the declared polite adult Sie counter interaction. Route the learner to a polite request model. | ☐ approve ☐ revise ☐ reject |
| NONCAN-DE-N1-03 | Gib mir einen Kaffee. | LEX-DE-001 | REJECTED_NONCANONICAL | failed_critical | achieved | acceptable | mismatch | INFORMAL_IMPERATIVE, REGISTER_DU_SIE_MISMATCH, MISSING_POLITENESS_MARKER | Grammatically well-formed informal imperative, but it conflicts with the declared Sie service register and lacks a politeness marker. Route the learner to a polite request model. | ☐ approve ☐ revise ☐ reject |

### RUBRIC-DE-N2-REP-01 — GER-SVC-REPAIR-01

Canonical candidate: `Wie bitte?` (Pardon? / Could you repeat that?)

| ID | German form | Intended item | Teaching role | Attempt | Intent | Form | Register | Error codes | Notes | Decision |
|---|---|---|---|---|---|---|---|---|---|---|
| VAR-DE-N2-01 | Wie bitte? | LEX-DE-007 | ACTIVE_TARGET | accepted_clean | achieved | acceptable | appropriate |  | Exact canonical repair formula. | ☐ approve ☐ revise ☐ reject |
| VAR-DE-N2-02 | Wie bitte | LEX-DE-007 | PASSIVE_ACCEPTED | accepted_clean | achieved | acceptable | appropriate |  | Question mark omitted in typed simulation; task intent achieved, punctuation policy pending human review. | ☐ approve ☐ revise ☐ reject |
| VAR-DE-N2-03 | Entschuldigung, wie bitte? | LEX-DE-007 | PASSIVE_ACCEPTED | accepted_clean | achieved | acceptable | appropriate |  | Polite apology prefix included; human review pending. | ☐ approve ☐ revise ☐ reject |
| VAR-DE-N2-04 | Noch einmal, bitte. | LEX-DE-009 | PASSIVE_ACCEPTED | accepted_clean | achieved | acceptable | appropriate |  | Repetition formula accepted as clean variant; human review pending. | ☐ approve ☐ revise ☐ reject |
| VAR-DE-N2-05 | Bitte noch einmal. | LEX-DE-009 | PASSIVE_ACCEPTED | accepted_clean | achieved | acceptable | appropriate |  | Word order variant of repetition formula; human review pending. | ☐ approve ☐ revise ☐ reject |
| VAR-DE-N2-06 | Etwas langsamer, bitte. | LEX-DE-011 | PASSIVE_ACCEPTED | accepted_clean | achieved | acceptable | appropriate |  | Speed reduction formula accepted clean; human review pending. | ☐ approve ☐ revise ☐ reject |
| VAR-DE-N2-07 | Langsamer, bitte. | LEX-DE-011 | PASSIVE_ACCEPTED | accepted_clean | achieved | acceptable | appropriate |  | Elliptical speed reduction formula accepted clean; human review pending. | ☐ approve ☐ revise ☐ reject |
| VAR-DE-N2-08 | Das habe ich nicht verstanden. | LEX-DE-012 | PASSIVE_ACCEPTED | accepted_clean | achieved | acceptable | appropriate |  | Explicit statement of non-understanding accepted clean; human review pending. | ☐ approve ☐ revise ☐ reject |
| VAR-DE-N2-09 | Ich verstehe nicht. | LEX-DE-012 | PASSIVE_ACCEPTED | accepted_clean | achieved | acceptable | appropriate |  | Present tense non-understanding statement accepted clean; human review pending. | ☐ approve ☐ revise ☐ reject |
| NONCAN-DE-N2-01 | Was? | LEX-DE-007 | REJECTED_NONCANONICAL | failed_critical | achieved | acceptable | mismatch | REGISTER_COLLOQUIAL_ABRUPT | Signals non-understanding, but 'Was?' is too abrupt for the declared polite adult Sie service interaction. Route the learner to a clarification model. | ☐ approve ☐ revise ☐ reject |
| NONCAN-DE-N2-02 | Hä? | LEX-DE-007 | REJECTED_NONCANONICAL | failed_critical | achieved | acceptable | mismatch | REGISTER_COLLOQUIAL_ABRUPT | Signals non-understanding, but 'Hä?' is overly colloquial for the declared polite adult Sie service interaction. Route the learner to a clarification model. | ☐ approve ☐ revise ☐ reject |
| NONCAN-DE-N2-03 | Nein danke. | LEX-DE-007 | OFF_TASK | failed_critical | not_achieved | acceptable | appropriate | OFF_TASK | Refusal response when prompt specifically models communication breakdown. | ☐ approve ☐ revise ☐ reject |

## Language review — activity and feedback strings

| Activity | Role | English learner prompt | German content | Success feedback | Repair feedback | Review decision |
|---|---|---|---|---|---|---|
| ACT-DE-N1-E0-01 | E0/H4/read_recognition | At the Café Counter: Notice how a customer asks for a coffee politely. | Clerk: 'Guten Tag! Bitte schön?' / Customer: 'Einen Kaffee, bitte.' / Clerk: 'Kommt sofort!' | Study the model and continue when you are ready. |  | ☐ approve ☐ revise ☐ reject |
| ACT-DE-N1-E1-01 | E1/H1/read_recognition | Which phrase means 'A coffee, please'? | A: Einen Kaffee, bitte. \| B: Guten Tag. \| C: Auf Wiedersehen. \| D: Nicht Kaffee. | Correct. That option fits the service-counter goal. | Look for 'Kaffee' with the polite ending 'bitte'. | ☐ approve ☐ revise ☐ reject |
| ACT-DE-N1-E1-02 | E1/H1/read_recognition | You want tea. Which phrase orders tea politely? | A: Guten Morgen. \| B: Einen Tee, bitte. \| C: Nein, danke. \| D: Einen Kaffee, bitte. | Correct. That option politely requests the intended drink. | Choose 'Einen Tee, bitte' when ordering tea. | ☐ approve ☐ revise ☐ reject |
| ACT-DE-N1-E1-03 | E1/H1/read_recognition | Which option is an appropriate polite request at the counter? | A: Kaffee! \| B: Ich will Kaffee. \| C: Einen Kaffee, bitte. \| D: Gib Kaffee. | Correct. That option is appropriate for the service-counter situation. | In service situations, 'Einen Kaffee, bitte' provides the expected level of politeness. | ☐ approve ☐ revise ☐ reject |
| ACT-DE-N1-E2-01 | E2/H3/typed_production | Arrange the words to say: 'A coffee, please.' | Tokens: [bitte.] [Einen] [Kaffee,] [Tee,] [Guten] | Correct. The word sequence forms a complete polite request. | Arrange: 'Einen' + 'Kaffee,' + 'bitte.'. | ☐ approve ☐ revise ☐ reject |
| ACT-DE-N1-E2-02 | E2/H3/typed_production | Complete the polite order for tea: 'Einen Tee, ______.' | Prompt: 'Einen Tee, ______.' / Target: 'bitte' | Correct. The request now contains the required politeness marker. | Type 'bitte' to finish the request. | ☐ approve ☐ revise ☐ reject |
| ACT-DE-N1-E3-01 | E3/H1/typed_production | At the Bakery: The baker greets you: 'Guten Morgen! Was darf es sein?' Type your polite order in German for: 'A tea, please.' | Baker: 'Guten Morgen! Was darf es sein?' | You used this request phrase independently in a new typed bakery scenario. | To order tea politely, type: 'Einen Tee, bitte.' | ☐ approve ☐ revise ☐ reject |
| ACT-DE-N1-E4-01 | E4/H1/typed_production | Return Mission — Station Kiosk: The board lists 'Apfelsaft'. The clerk asks: 'Hallo! Was möchten Sie?' Type your order in German for: 'An apple juice, please.' | Clerk: 'Hallo! Was möchten Sie?' [Menu board visible: Apfelsaft] | You produced this request phrase in a delayed typed return check. | To order apple juice, type: 'Einen Apfelsaft, bitte.' | ☐ approve ☐ revise ☐ reject |
| ACT-DE-N2-E0-01 | E0/H4/read_recognition | When Words Move Fast: Notice how 'Wie bitte?' signals that you need the speaker to repeat. | Clerk: 'Darf es sonst noch etwas sein?' / Customer: 'Wie bitte?' / Clerk: 'Möchten Sie noch etwas?' / Customer: 'Nein, danke.' | Study the communication-repair model and continue when you are ready. |  | ☐ approve ☐ revise ☐ reject |
| ACT-DE-N2-E1-01 | E1/H1/read_recognition | The clerk speaks quickly and you miss it. Which phrase means 'Pardon?' or 'Could you repeat that?'? | A: Wie bitte? \| B: Einen Tee, bitte. \| C: Guten Tag. \| D: Auf Wiedersehen. | Correct. That option signals non-understanding. | Use 'Wie bitte?' when you need someone to repeat. | ☐ approve ☐ revise ☐ reject |
| ACT-DE-N2-E1-02 | E1/H1/read_recognition | At the bakery, the baker speaks too fast. Which phrase signals 'Pardon?'? | A: Bitte schön. \| B: Wie bitte? \| C: Danke schön. \| D: Einen Kaffee, bitte. | Correct. That option fits the communication-breakdown situation. | Choose 'Wie bitte?' to signal that you did not catch what was said. | ☐ approve ☐ revise ☐ reject |
| ACT-DE-N2-E1-03 | E1/H1/read_recognition | You didn't hear the clerk at the kiosk. Which phrase asks for clarification? | A: Nein, danke. \| B: Kein Problem. \| C: Wie bitte? \| D: Auf Wiedersehen. | Correct. That option appropriately asks for clarification. | Select 'Wie bitte?' when you need to hear something again. | ☐ approve ☐ revise ☐ reject |
| ACT-DE-N2-E2-01 | E2/H3/typed_production | Arrange the words to say: 'Pardon?' | Tokens: [bitte?] [Wie] [Danke] [Guten] | Correct. The word sequence forms the intended repair expression. | Combine 'Wie' + 'bitte?'. | ☐ approve ☐ revise ☐ reject |
| ACT-DE-N2-E2-02 | E2/H3/typed_production | Complete the phrase for 'Pardon?': 'Wie ______?' | Prompt: 'Wie ______?' / Target: 'bitte' | Correct. The repair expression is complete. | Type 'bitte' to complete 'Wie bitte?'. | ☐ approve ☐ revise ☐ reject |
| ACT-DE-N2-E3-01 | E3/H1/typed_production | At the Juice Stand: The vendor asks briskly: 'Darf es sonst noch etwas sein?' You didn't catch that. What do you say in German? | Vendor: 'Darf es sonst noch etwas sein?' | You used this repair phrase in a new typed situation. | When you miss something, you can type 'Wie bitte?'. | ☐ approve ☐ revise ☐ reject |
| ACT-DE-N2-E4-01 | E4/H1/typed_production | Return Mission — Station Kiosk: The clerk asks briskly: 'Möchten Sie eine Quittung?' You missed what was said. What do you say in German? | Clerk: 'Möchten Sie eine Quittung?' | You used this repair phrase in a delayed typed return check. | To ask for repetition, type 'Wie bitte?'. | ☐ approve ☐ revise ☐ reject |

## Language review — audio transcripts

| Audio ID | Transcript | Speaker/scene | Recording state | Language decision |
|---|---|---|---|---|
| AUD-DE-N1-001 | Guten Tag! Bitte schön? | CLERK_FEMALE; CAFE_COUNTER | NOT_RECORDED | ☐ approve script ☐ revise ☐ reject |
| AUD-DE-N1-002 | Einen Kaffee, bitte. | CUSTOMER_MALE; CAFE_COUNTER | NOT_RECORDED | ☐ approve script ☐ revise ☐ reject |
| AUD-DE-N1-003 | Kommt sofort! | CLERK_FEMALE; CAFE_COUNTER | NOT_RECORDED | ☐ approve script ☐ revise ☐ reject |
| AUD-DE-N1-004 | Guten Morgen! Was darf es sein? | BAKER_MALE; BAKERY_COUNTER | NOT_RECORDED | ☐ approve script ☐ revise ☐ reject |
| AUD-DE-N1-005 | Hallo! Was möchten Sie? | KIOSK_CLERK_FEMALE; STATION_KIOSK | NOT_RECORDED | ☐ approve script ☐ revise ☐ reject |
| AUD-DE-N2-001 | Darf es sonst noch etwas sein? | CLERK_MALE_RAPID; CAFE_COUNTER_BREAKDOWN | NOT_RECORDED | ☐ approve script ☐ revise ☐ reject |
| AUD-DE-N2-002 | Wie bitte? | CUSTOMER_FEMALE; CAFE_COUNTER_REPAIR | NOT_RECORDED | ☐ approve script ☐ revise ☐ reject |
| AUD-DE-N2-003 | Möchten Sie noch etwas? | CLERK_MALE_SLOWER; CAFE_COUNTER_RECOVERY | NOT_RECORDED | ☐ approve script ☐ revise ☐ reject |
| AUD-DE-N2-004 | Nein, danke. | CUSTOMER_FEMALE; CAFE_COUNTER_CLOSING | NOT_RECORDED | ☐ approve script ☐ revise ☐ reject |
| AUD-DE-N2-005 | Möchten Sie eine Quittung? | KIOSK_CLERK_FEMALE; STATION_KIOSK | NOT_RECORDED | ☐ approve script ☐ revise ☐ reject |

## Pedagogy and evidence review — activities

### ACT-DE-N1-E0-01

- Goal/prompt: Observe a polite coffee order at a German counter. / At the Café Counter: Notice how a customer asks for a coffee politely.
- Contract: `E0`, `H4`, `read_recognition`, `text` → `selection`
- Answer exposure: `true`; success reveal `false`; repair reveal `false`
- Context: `{"intent_code":"SERVICE_REQUEST_ONE","venue":"cafe","referent_or_information_slot":"coffee","interlocutor":"clerk","dialogue_position":"initial_order","prompt_surface":"model_card","stimulus_modality":"text","distractor_set":"none"}`
- Changed dimensions: —
- Familiarity: `LEX-DE-001:PRETAUGHT_ACCEPTED:event/ledger`, `LEX-DE-004:PRETAUGHT_ACCEPTED:event/ledger`, `LEX-DE-006:PRETAUGHT_ACCEPTED:event/ledger`
- Evaluator: `PASS_ON_CONTINUE`
- Versions: content `2.1.0-candidate`, evidence `1.1`, record `2.1.0`
- Decision: ☐ approve ☐ revise ☐ reject

### ACT-DE-N1-E1-01

- Goal/prompt: Identify the polite German phrase for ordering coffee. / Which phrase means 'A coffee, please'?
- Contract: `E1`, `H1`, `read_recognition`, `text` → `selection`
- Answer exposure: `false`; success reveal `false`; repair reveal `true`
- Context: `{"intent_code":"SERVICE_REQUEST_ONE","venue":"cafe","referent_or_information_slot":"coffee","interlocutor":"clerk","dialogue_position":"order_selection","prompt_surface":"four_choice_item","stimulus_modality":"text","distractor_set":"greeting_closing_negation"}`
- Changed dimensions: —
- Familiarity: `LEX-DE-001:PRETAUGHT_ACCEPTED:event/ledger`, `LEX-DE-004:PRETAUGHT_ACCEPTED:event/ledger`, `LEX-DE-006:PRETAUGHT_ACCEPTED:event/ledger`
- Evaluator: `EXACT_MATCH_CHOICE_A`
- Versions: content `2.1.0-candidate`, evidence `1.1`, record `2.1.0`
- Decision: ☐ approve ☐ revise ☐ reject

### ACT-DE-N1-E1-02

- Goal/prompt: Identify the polite German phrase for ordering tea. / You want tea. Which phrase orders tea politely?
- Contract: `E1`, `H1`, `read_recognition`, `text` → `selection`
- Answer exposure: `false`; success reveal `false`; repair reveal `true`
- Context: `{"intent_code":"SERVICE_REQUEST_ONE","venue":"cafe","referent_or_information_slot":"tea","interlocutor":"clerk","dialogue_position":"order_selection","prompt_surface":"four_choice_item","stimulus_modality":"text","distractor_set":"greeting_refusal_other_item"}`
- Changed dimensions: —
- Familiarity: `LEX-DE-002:PRETAUGHT_ACCEPTED:event/ledger`, `LEX-DE-004:PRETAUGHT_ACCEPTED:event/ledger`, `LEX-DE-006:PRETAUGHT_ACCEPTED:event/ledger`
- Evaluator: `EXACT_MATCH_CHOICE_B`
- Versions: content `2.1.0-candidate`, evidence `1.1`, record `2.1.0`
- Decision: ☐ approve ☐ revise ☐ reject

### ACT-DE-N1-E1-03

- Goal/prompt: Distinguish an appropriate polite request from overly direct alternatives. / Which option is an appropriate polite request at the counter?
- Contract: `E1`, `H1`, `read_recognition`, `text` → `selection`
- Answer exposure: `false`; success reveal `false`; repair reveal `true`
- Context: `{"intent_code":"SERVICE_REQUEST_ONE","venue":"cafe","referent_or_information_slot":"coffee","interlocutor":"clerk","dialogue_position":"order_selection","prompt_surface":"four_choice_item","stimulus_modality":"text","distractor_set":"isolated_noun_direct_modal_imperative"}`
- Changed dimensions: —
- Familiarity: `LEX-DE-001:PRETAUGHT_ACCEPTED:event/ledger`, `LEX-DE-004:PRETAUGHT_ACCEPTED:event/ledger`, `LEX-DE-006:PRETAUGHT_ACCEPTED:event/ledger`
- Evaluator: `EXACT_MATCH_CHOICE_C`
- Versions: content `2.1.0-candidate`, evidence `1.1`, record `2.1.0`
- Decision: ☐ approve ☐ revise ☐ reject

### ACT-DE-N1-E2-01

- Goal/prompt: Build a polite coffee order using word tiles. / Arrange the words to say: 'A coffee, please.'
- Contract: `E2`, `H3`, `typed_production`, `text` → `construction`
- Answer exposure: `false`; success reveal `false`; repair reveal `true`
- Context: `{"intent_code":"SERVICE_REQUEST_ONE","venue":"cafe","referent_or_information_slot":"coffee","interlocutor":"clerk","dialogue_position":"supported_build","prompt_surface":"token_bank","stimulus_modality":"text","distractor_set":"lexical_distractors"}`
- Changed dimensions: —
- Familiarity: `LEX-DE-001:PRETAUGHT_ACCEPTED:event/ledger`, `LEX-DE-004:PRETAUGHT_ACCEPTED:event/ledger`, `LEX-DE-006:PRETAUGHT_ACCEPTED:event/ledger`
- Evaluator: `TOKEN_ORDER_EINEN_KAFFEE_BITTE`
- Versions: content `2.1.0-candidate`, evidence `1.1`, record `2.1.0`
- Decision: ☐ approve ☐ revise ☐ reject

### ACT-DE-N1-E2-02

- Goal/prompt: Type the missing politeness word to complete a tea order. / Complete the polite order for tea: 'Einen Tee, ______.'
- Contract: `E2`, `H3`, `typed_production`, `text` → `typed`
- Answer exposure: `false`; success reveal `false`; repair reveal `true`
- Context: `{"intent_code":"SERVICE_REQUEST_ONE","venue":"cafe","referent_or_information_slot":"tea","interlocutor":"clerk","dialogue_position":"supported_slot","prompt_surface":"slot_fill","stimulus_modality":"text","distractor_set":"none"}`
- Changed dimensions: —
- Familiarity: `LEX-DE-002:PRETAUGHT_ACCEPTED:event/ledger`, `LEX-DE-004:PRETAUGHT_ACCEPTED:event/ledger`, `LEX-DE-006:PRETAUGHT_ACCEPTED:event/ledger`
- Evaluator: `SLOT_EQUALS_BITTE`
- Versions: content `2.1.0-candidate`, evidence `1.1`, record `2.1.0`
- Decision: ☐ approve ☐ revise ☐ reject

### ACT-DE-N1-E3-01

- Goal/prompt: Independently order tea in a new bakery context without target German words in the prompt. / At the Bakery: The baker greets you: 'Guten Morgen! Was darf es sein?' Type your polite order in German for: 'A tea, please.'
- Contract: `E3`, `H1`, `typed_production`, `text` → `typed`
- Answer exposure: `false`; success reveal `false`; repair reveal `true`
- Context: `{"intent_code":"SERVICE_REQUEST_ONE","venue":"bakery","referent_or_information_slot":"tea","interlocutor":"baker","dialogue_position":"initial_order","prompt_surface":"free_typed_simulation","stimulus_modality":"text","distractor_set":"none"}`
- Changed dimensions: `venue:cafe->bakery:CONTEXTUAL`, `referent_or_information_slot:coffee->tea:SEMANTIC_RETRIEVAL`, `prompt_surface:token_bank->free_typed_simulation:SURFACE`
- Familiarity: `LEX-DE-002:PRETAUGHT_ACCEPTED:event/ledger`, `LEX-DE-004:PRETAUGHT_ACCEPTED:event/ledger`, `LEX-DE-006:PRETAUGHT_ACCEPTED:event/ledger`
- Evaluator: `{"rubric_id":"RUBRIC-DE-N1-REQ-01","rubric_version":"2.1.0","target_item_id":"LEX-DE-002","allowed_variant_ids":["VAR-DE-N1-08"],"normalization_profile":"UNICODE_NFC_TRIM_COLLAPSE_WHITESPACE","exact_target_item_required":true}`
- Versions: content `2.1.0-candidate`, evidence `1.1`, record `2.1.0`
- Decision: ☐ approve ☐ revise ☐ reject

### ACT-DE-N1-E4-01

- Goal/prompt: Recall and type a polite request for apple juice at a station kiosk after a clean delay. / Return Mission — Station Kiosk: The board lists 'Apfelsaft'. The clerk asks: 'Hallo! Was möchten Sie?' Type your order in German for: 'An apple juice, please.'
- Contract: `E4`, `H1`, `typed_production`, `text` → `typed`
- Answer exposure: `false`; success reveal `false`; repair reveal `true`
- Context: `{"intent_code":"SERVICE_REQUEST_ONE","venue":"station_kiosk","referent_or_information_slot":"apple_juice","interlocutor":"kiosk_clerk","dialogue_position":"initial_order","prompt_surface":"free_typed_simulation","stimulus_modality":"text","distractor_set":"none"}`
- Changed dimensions: `venue:bakery->station_kiosk:CONTEXTUAL`, `referent_or_information_slot:tea->apple_juice:SEMANTIC_RETRIEVAL`, `interlocutor:baker->kiosk_clerk:CONTEXTUAL`
- Familiarity: `LEX-DE-003:VISIBLE_IN_NATURAL_CONTEXT:content_de`, `LEX-DE-004:PRETAUGHT_ACCEPTED:event/ledger`, `LEX-DE-006:PRETAUGHT_ACCEPTED:event/ledger`
- Evaluator: `{"rubric_id":"RUBRIC-DE-N1-REQ-01","rubric_version":"2.1.0","target_item_id":"LEX-DE-003","allowed_variant_ids":["VAR-DE-N1-09","VAR-DE-N1-10","VAR-DE-N1-11"],"normalization_profile":"UNICODE_NFC_TRIM_COLLAPSE_WHITESPACE","exact_target_item_required":true}`
- Versions: content `2.1.0-candidate`, evidence `1.1`, record `2.1.0`
- E4 policy: `{"prior_tier":"E3","prior_same_skill":true,"prior_same_lane":true,"minimum_clean_delay_seconds":72000,"scheduler_target_seconds":[86400,259200],"clock_anchor":"MAX(PRIOR_E3_AT,LAST_ANSWER_REVEAL_AT)","answer_reveal_resets_clock":true,"allowed_support_levels":["H0","H1"],"changed_context_required":true,"rubric_compatibility_required":true,"content_familiarity_required":true}`
- Decision: ☐ approve ☐ revise ☐ reject

### ACT-DE-N2-E0-01

- Goal/prompt: Observe how to signal non-understanding and continue a transaction. / When Words Move Fast: Notice how 'Wie bitte?' signals that you need the speaker to repeat.
- Contract: `E0`, `H4`, `read_recognition`, `text` → `selection`
- Answer exposure: `true`; success reveal `false`; repair reveal `false`
- Context: `{"intent_code":"COMMUNICATION_REPAIR","venue":"cafe","referent_or_information_slot":"clarification_request","interlocutor":"clerk","dialogue_position":"breakdown_repair","prompt_surface":"model_card","stimulus_modality":"text","distractor_set":"none"}`
- Changed dimensions: —
- Familiarity: `LEX-DE-004:PRETAUGHT_ACCEPTED:event/ledger`, `LEX-DE-005:PRETAUGHT_ACCEPTED:event/ledger`, `LEX-DE-007:PRETAUGHT_ACCEPTED:event/ledger`
- Evaluator: `PASS_ON_CONTINUE`
- Versions: content `2.1.0-candidate`, evidence `1.1`, record `2.1.0`
- Decision: ☐ approve ☐ revise ☐ reject

### ACT-DE-N2-E1-01

- Goal/prompt: Identify 'Wie bitte?' as the standard phrase for 'Pardon?' in a café context. / The clerk speaks quickly and you miss it. Which phrase means 'Pardon?' or 'Could you repeat that?'?
- Contract: `E1`, `H1`, `read_recognition`, `text` → `selection`
- Answer exposure: `false`; success reveal `false`; repair reveal `true`
- Context: `{"intent_code":"COMMUNICATION_REPAIR","venue":"cafe","referent_or_information_slot":"pardon_formula","interlocutor":"clerk","dialogue_position":"repair_selection","prompt_surface":"four_choice_item","stimulus_modality":"text","distractor_set":"request_greeting_closing"}`
- Changed dimensions: —
- Familiarity: `LEX-DE-007:PRETAUGHT_ACCEPTED:event/ledger`
- Evaluator: `EXACT_MATCH_CHOICE_A`
- Versions: content `2.1.0-candidate`, evidence `1.1`, record `2.1.0`
- Decision: ☐ approve ☐ revise ☐ reject

### ACT-DE-N2-E1-02

- Goal/prompt: Identify 'Wie bitte?' as the repair phrase in a bakery context. / At the bakery, the baker speaks too fast. Which phrase signals 'Pardon?'?
- Contract: `E1`, `H1`, `read_recognition`, `text` → `selection`
- Answer exposure: `false`; success reveal `false`; repair reveal `true`
- Context: `{"intent_code":"COMMUNICATION_REPAIR","venue":"bakery","referent_or_information_slot":"pardon_formula","interlocutor":"baker","dialogue_position":"repair_selection","prompt_surface":"four_choice_item","stimulus_modality":"text","distractor_set":"service_phrase_thanks_order"}`
- Changed dimensions: —
- Familiarity: `LEX-DE-007:PRETAUGHT_ACCEPTED:event/ledger`
- Evaluator: `EXACT_MATCH_CHOICE_B`
- Versions: content `2.1.0-candidate`, evidence `1.1`, record `2.1.0`
- Decision: ☐ approve ☐ revise ☐ reject

### ACT-DE-N2-E1-03

- Goal/prompt: Identify 'Wie bitte?' among refusal and closing distractors. / You didn't hear the clerk at the kiosk. Which phrase asks for clarification?
- Contract: `E1`, `H1`, `read_recognition`, `text` → `selection`
- Answer exposure: `false`; success reveal `false`; repair reveal `true`
- Context: `{"intent_code":"COMMUNICATION_REPAIR","venue":"station_kiosk","referent_or_information_slot":"pardon_formula","interlocutor":"kiosk_clerk","dialogue_position":"repair_selection","prompt_surface":"four_choice_item","stimulus_modality":"text","distractor_set":"refusal_idiom_closing"}`
- Changed dimensions: —
- Familiarity: `LEX-DE-007:PRETAUGHT_ACCEPTED:event/ledger`
- Evaluator: `EXACT_MATCH_CHOICE_C`
- Versions: content `2.1.0-candidate`, evidence `1.1`, record `2.1.0`
- Decision: ☐ approve ☐ revise ☐ reject

### ACT-DE-N2-E2-01

- Goal/prompt: Assemble 'Wie bitte?' from word tiles. / Arrange the words to say: 'Pardon?'
- Contract: `E2`, `H3`, `typed_production`, `text` → `construction`
- Answer exposure: `false`; success reveal `false`; repair reveal `true`
- Context: `{"intent_code":"COMMUNICATION_REPAIR","venue":"cafe","referent_or_information_slot":"pardon_formula","interlocutor":"clerk","dialogue_position":"supported_build","prompt_surface":"token_bank","stimulus_modality":"text","distractor_set":"lexical_distractors"}`
- Changed dimensions: —
- Familiarity: `LEX-DE-004:PRETAUGHT_ACCEPTED:event/ledger`, `LEX-DE-007:PRETAUGHT_ACCEPTED:event/ledger`
- Evaluator: `TOKEN_ORDER_WIE_BITTE`
- Versions: content `2.1.0-candidate`, evidence `1.1`, record `2.1.0`
- Decision: ☐ approve ☐ revise ☐ reject

### ACT-DE-N2-E2-02

- Goal/prompt: Type the missing word in 'Wie ______?'. / Complete the phrase for 'Pardon?': 'Wie ______?'
- Contract: `E2`, `H3`, `typed_production`, `text` → `typed`
- Answer exposure: `false`; success reveal `false`; repair reveal `true`
- Context: `{"intent_code":"COMMUNICATION_REPAIR","venue":"cafe","referent_or_information_slot":"pardon_formula","interlocutor":"clerk","dialogue_position":"supported_slot","prompt_surface":"slot_fill","stimulus_modality":"text","distractor_set":"none"}`
- Changed dimensions: —
- Familiarity: `LEX-DE-004:PRETAUGHT_ACCEPTED:event/ledger`, `LEX-DE-007:PRETAUGHT_ACCEPTED:event/ledger`
- Evaluator: `SLOT_EQUALS_BITTE`
- Versions: content `2.1.0-candidate`, evidence `1.1`, record `2.1.0`
- Decision: ☐ approve ☐ revise ☐ reject

### ACT-DE-N2-E3-01

- Goal/prompt: Independently type a German repair formula in a written juice stand simulation when the vendor's question is unclear. / At the Juice Stand: The vendor asks briskly: 'Darf es sonst noch etwas sein?' You didn't catch that. What do you say in German?
- Contract: `E3`, `H1`, `typed_production`, `text` → `typed`
- Answer exposure: `false`; success reveal `false`; repair reveal `true`
- Context: `{"intent_code":"COMMUNICATION_REPAIR","venue":"juice_stand","referent_or_information_slot":"unclear_followup_question","interlocutor":"juice_vendor","dialogue_position":"breakdown_turn","prompt_surface":"free_typed_simulation","stimulus_modality":"text","distractor_set":"none"}`
- Changed dimensions: `venue:cafe->juice_stand:CONTEXTUAL`, `referent_or_information_slot:pardon_formula->unclear_followup_question:SEMANTIC_RETRIEVAL`, `interlocutor:clerk->juice_vendor:CONTEXTUAL`, `prompt_surface:token_bank->free_typed_simulation:SURFACE`
- Familiarity: `LEX-DE-004:PRETAUGHT_ACCEPTED:event/ledger`, `LEX-DE-007:PRETAUGHT_ACCEPTED:event/ledger`
- Evaluator: `{"rubric_id":"RUBRIC-DE-N2-REP-01","rubric_version":"2.1.0","target_item_id":"LEX-DE-007","allowed_variant_ids":["VAR-DE-N2-01","VAR-DE-N2-02","VAR-DE-N2-03"],"normalization_profile":"UNICODE_NFC_TRIM_COLLAPSE_WHITESPACE","exact_target_item_required":true}`
- Versions: content `2.1.0-candidate`, evidence `1.1`, record `2.1.0`
- Decision: ☐ approve ☐ revise ☐ reject

### ACT-DE-N2-E4-01

- Goal/prompt: Recall and type a German repair formula in a delayed return check at a station kiosk. / Return Mission — Station Kiosk: The clerk asks briskly: 'Möchten Sie eine Quittung?' You missed what was said. What do you say in German?
- Contract: `E4`, `H1`, `typed_production`, `text` → `typed`
- Answer exposure: `false`; success reveal `false`; repair reveal `true`
- Context: `{"intent_code":"COMMUNICATION_REPAIR","venue":"station_kiosk","referent_or_information_slot":"unclear_receipt_offer","interlocutor":"kiosk_clerk","dialogue_position":"breakdown_turn","prompt_surface":"free_typed_simulation","stimulus_modality":"text","distractor_set":"none"}`
- Changed dimensions: `venue:juice_stand->station_kiosk:CONTEXTUAL`, `referent_or_information_slot:followup_query->receipt_query:SEMANTIC_RETRIEVAL`, `interlocutor:juice_vendor->kiosk_clerk:CONTEXTUAL`
- Familiarity: `LEX-DE-004:PRETAUGHT_ACCEPTED:event/ledger`, `LEX-DE-007:PRETAUGHT_ACCEPTED:event/ledger`
- Evaluator: `{"rubric_id":"RUBRIC-DE-N2-REP-01","rubric_version":"2.1.0","target_item_id":"LEX-DE-007","allowed_variant_ids":["VAR-DE-N2-01","VAR-DE-N2-02","VAR-DE-N2-03"],"normalization_profile":"UNICODE_NFC_TRIM_COLLAPSE_WHITESPACE","exact_target_item_required":true}`
- Versions: content `2.1.0-candidate`, evidence `1.1`, record `2.1.0`
- E4 policy: `{"prior_tier":"E3","prior_same_skill":true,"prior_same_lane":true,"minimum_clean_delay_seconds":72000,"scheduler_target_seconds":[86400,259200],"clock_anchor":"MAX(PRIOR_E3_AT,LAST_ANSWER_REVEAL_AT)","answer_reveal_resets_clock":true,"allowed_support_levels":["H0","H1"],"changed_context_required":true,"rubric_compatibility_required":true,"content_familiarity_required":true}`
- Decision: ☐ approve ☐ revise ☐ reject

## Pedagogy and evidence review — bundles

| Bundle | Skill | Stage/lane | Required | Children | Decision |
|---|---|---|---|---|---|
| BND-DE-N1-E1 | GER-SVC-REQUEST-ONE-01 | E1/read_recognition | 3 of 3 | ACT-DE-N1-E1-01, ACT-DE-N1-E1-02, ACT-DE-N1-E1-03 | ☐ approve ☐ revise ☐ reject |
| BND-DE-N1-E2 | GER-SVC-REQUEST-ONE-01 | E2/typed_production | 2 of 2 | ACT-DE-N1-E2-01, ACT-DE-N1-E2-02 | ☐ approve ☐ revise ☐ reject |
| BND-DE-N2-E1 | GER-SVC-REPAIR-01 | E1/read_recognition | 3 of 3 | ACT-DE-N2-E1-01, ACT-DE-N2-E1-02, ACT-DE-N2-E1-03 | ☐ approve ☐ revise ☐ reject |
| BND-DE-N2-E2 | GER-SVC-REPAIR-01 | E2/typed_production | 2 of 2 | ACT-DE-N2-E2-01, ACT-DE-N2-E2-02 | ☐ approve ☐ revise ☐ reject |

## Fixture review

These are expected contracts only. Their `actual_*` fields remain null until an evaluator exists.

| Fixture | Purpose | Attempt result | Evidence result | Source events | Run state | Decision |
|---|---|---|---|---|---|---|
| ERR-F01 | Negative configuration probe: a full model exposure incorrectly declared H0/E4 is reclassified to H4/E0. | accepted_clean; achieved; acceptable; appropriate | E0; MODEL_EXPOSURE_RECLASSIFIED_H4_E0 |  | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F02 | Negative configuration probe: an English semantic-goal prompt incorrectly declared H0 is reclassified to H1. | accepted_clean; achieved; acceptable; appropriate | E3; SEMANTIC_GOAL_PROMPT_RECLASSIFIED_H1 |  | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F03 | Word bank construction activity (H3) correctly caps evidence at E2. | accepted_clean; achieved; acceptable; appropriate | E2; SUPPORTED_PRODUCTION_H3 |  | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F04 | Contaminated retry immediately after answer reveal grants E0/practice only. | accepted_clean; achieved; acceptable; appropriate | E0; CONTAMINATED_RETRY_BLOCKED_FROM_E2 |  | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F05 | Valid German string submitted without activity context yields evidence award NONE. | accepted_clean; achieved; acceptable; appropriate | NONE; MISSING_ACTIVITY_RUNTIME_CONTEXT |  | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F06 | N1 typed production with H1 support and two changed dimensions qualifies for E3. | accepted_clean; achieved; acceptable; appropriate | E3; INDEPENDENT_TRANSFER_QUALIFIED |  | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F07 | Target-bearing lexical cue in prompt prevents E3 independent award. | accepted_clean; achieved; acceptable; appropriate | E2; TARGET_BEARING_CUE_CAPS_AT_E2 |  | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F08 | N2 typed simulation awards typed_production evidence only; listening/spoken lanes unchanged. | accepted_clean; achieved; acceptable; appropriate | E3; TYPED_REPAIR_SIMULATION_QUALIFIED_E3 |  | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F09 | Explicit strategy instruction in prompt ('ask them to repeat') blocks self-initiated repair E3. | accepted_clean; achieved; acceptable; appropriate | E2; EXPLICIT_STRATEGY_INSTRUCTION_CAPS_AT_E2 |  | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F10 | Valid 26-hour clean delay return in same lane qualifies for E4. | accepted_clean; achieved; acceptable; appropriate | E4; DELAYED_RETURN_E4_QUALIFIED | EVT-ERR-F10-PRIOR-E3, EVT-FAMILIAR-LEX-DE-004, EVT-FAMILIAR-LEX-DE-006 | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F11 | Return check after only 3 hours clean delay cannot grant E4 (capped at E3 maintenance). | accepted_clean; achieved; acceptable; appropriate | E3; DELAY_THRESHOLD_NOT_MET | EVT-ERR-F11-PRIOR-E3, EVT-FAMILIAR-LEX-DE-004, EVT-FAMILIAR-LEX-DE-006 | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F12 | Answer reveal 15 minutes before return attempt resets clean-delay clock and blocks E4. | accepted_clean; achieved; acceptable; appropriate | E3; DELAY_RESET_BY_EXPOSURE | EVT-ERR-F12-PRIOR-E3, EVT-ERR-F12-ANSWER-REVEAL, EVT-FAMILIAR-LEX-DE-004, EVT-FAMILIAR-LEX-DE-006 | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F13 | Prior typed E3 does not satisfy spoken return check (unsupported evaluator in lane). | unscored; uncertain; uncertain; uncertain | NONE; UNSUPPORTED_EVALUATOR_IN_SPOKEN_LANE | EVT-ERR-F13-PRIOR-E3, EVT-FAMILIAR-LEX-DE-004, EVT-FAMILIAR-LEX-DE-006 | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F14 | Counting delay as a context dimension fails changed-context validation. | accepted_clean; achieved; acceptable; appropriate | E2; INVALID_CHANGED_DIMENSIONS_DELAY_IS_NOT_CONTEXT |  | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F15 | Completely new untaught noun in E4 produces unscored prerequisite missing, not learner failure. | unscored; uncertain; uncertain; uncertain | NONE; UNSCORED_PREREQUISITE_MISSING | EVT-ERR-F15-PRIOR-E3, EVT-FAMILIAR-LEX-DE-004, EVT-FAMILIAR-LEX-DE-006 | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F16 | 'Ich will einen Kaffee.' is grammatically well-formed and semantically clear but deterministically rejected for the declared polite Sie service register. | failed_critical; achieved; acceptable; mismatch | NONE; FAILED_CRITICAL_REGISTER_MISMATCH |  | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F17 | 'Hä?' signals non-understanding but is deterministically rejected for the declared polite Sie service register. | failed_critical; achieved; acceptable; mismatch | NONE; FAILED_CRITICAL_REGISTER_MISMATCH |  | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F18 | Global ss -> ß rewriting is rejected; raw input and normalized input preserved separately. | unscored; uncertain; uncertain; uncertain | NONE; INVALID_NORMALIZATION_APPLIED |  | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F19-E4-CLEAN-26H | Valid 26-hour clean delay return with familiar item awards E4. | accepted_clean; achieved; acceptable; appropriate | E4; DELAYED_RETURN_E4_QUALIFIED | EVT-ERR-F19-E4-CLEAN-26H-PRIOR-E3, EVT-FAMILIAR-LEX-DE-004, EVT-FAMILIAR-LEX-DE-006 | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F20-E4-TOO-EARLY | Return check after only 2 hours clean delay cannot grant E4. | accepted_clean; achieved; acceptable; appropriate | E3; DELAY_THRESHOLD_NOT_MET | EVT-ERR-F20-E4-TOO-EARLY-PRIOR-E3, EVT-FAMILIAR-LEX-DE-004, EVT-FAMILIAR-LEX-DE-006 | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F21-E4-PRIOR-E3-MISSING | Return check attempted without prior E3 in skill cannot award E4. | accepted_clean; achieved; acceptable; appropriate | E3; MISSING_PRIOR_E3_RECORD | EVT-FAMILIAR-LEX-DE-004, EVT-FAMILIAR-LEX-DE-006 | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F22-E4-CROSS-MODAL | Prior E3 in reading lane does not satisfy typed production E4 requirement. | accepted_clean; achieved; acceptable; appropriate | E3; CROSS_MODAL_PRIOR_E3_INVALID | EVT-ERR-F22-E4-CROSS-MODAL-PRIOR-E3, EVT-FAMILIAR-LEX-DE-004, EVT-FAMILIAR-LEX-DE-006 | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F23-E4-ANSWER-REVEAL-RESET | Answer reveal occurring 15 minutes before E4 return resets clean delay. | accepted_clean; achieved; acceptable; appropriate | E3; DELAY_RESET_BY_EXPOSURE | EVT-ERR-F23-E4-ANSWER-REVEAL-RESET-PRIOR-E3, EVT-ERR-F23-E4-ANSWER-REVEAL-RESET-ANSWER-REVEAL, EVT-FAMILIAR-LEX-DE-004, EVT-FAMILIAR-LEX-DE-006 | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F24-E4-INCOMPATIBLE-RUBRIC | Rubric version mismatch prevents automatic E4 qualification. | unscored; uncertain; uncertain; uncertain | NONE; RUBRIC_VERSION_MISMATCH | EVT-ERR-F24-E4-INCOMPATIBLE-RUBRIC-PRIOR-E3, EVT-FAMILIAR-LEX-DE-004, EVT-FAMILIAR-LEX-DE-006 | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F25-E4-MISSING-FAMILIARITY | Target item not pre-taught or visible results in unscored prerequisite missing. | unscored; uncertain; uncertain; uncertain | NONE; UNSCORED_PREREQUISITE_MISSING | EVT-ERR-F25-E4-MISSING-FAMILIARITY-PRIOR-E3, EVT-FAMILIAR-LEX-DE-004, EVT-FAMILIAR-LEX-DE-006 | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F26-E4-FAILED-RETURN | Failed return attempt preserves historical E3 and transitions attention state to needs_repair. | failed_critical; partial; minor_issue; mismatch | NONE; FAILED_CRITICAL_RETURN_ATTEMPT, PRESERVE_HISTORICAL_E3, TRANSITION_ATTENTION_STATE_NEEDS_REPAIR | EVT-ERR-F26-E4-FAILED-RETURN-PRIOR-E3, EVT-FAMILIAR-LEX-DE-004, EVT-FAMILIAR-LEX-DE-006 | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |
| ERR-F27-TECH-UNCERTAINTY | Corrupted or unreadable input payload produces unscored technical uncertainty. | unscored; uncertain; uncertain; uncertain | NONE; TECHNICAL_PAYLOAD_CORRUPTED |  | NOT_RUN_NO_EVALUATOR | ☐ approve ☐ revise ☐ reject |

## Provenance and license review

| ID | Direct source | Claim scope | Access date | Rights/reuse status | Decision |
|---|---|---|---|---|---|
| SRC-DE-001 | [CEFR Companion Volume 2020](https://rm.coe.int/common-european-framework-of-reference-for-languages-learning-teaching/16809ea0d4) | CEFR level framework and general descriptors only; no Pre-A1 certification claim is made for this pack. | 2026-09-02 | COPYRIGHT_ALL_RIGHTS_RESERVED_REFERENCE_ONLY | ☐ citation scope approved ☐ revise |
| SRC-DE-002 | [Start Deutsch 1 Prüfungsziele und Testbeschreibung](https://www.goethe.de/pro/relaunch/prf/sk/Pruefungsziele_Testbeschreibung_A1_SD1.pdf) | General Goethe-Zertifikat A1 examination profile and everyday service interaction benchmark only; not evidence for a Pre-A1 certification or sequence. | 2026-09-02 | COPYRIGHT_ALL_RIGHTS_RESERVED_REFERENCE_ONLY | ☐ citation scope approved ☐ revise |
| SRC-DE-003 | [Amtliches Regelwerk der deutschen Rechtschreibung — § 69](https://grammis.ids-mannheim.de/rechtschreibung/6200) | The question mark marks an utterance as a question; used only for the VAR-DE-N2-02 punctuation-review question. | 2026-09-02 | COPYRIGHT_ALL_RIGHTS_RESERVED_REFERENCE_ONLY | ☐ citation scope approved ☐ revise |
| SRC-DE-004 | [Duden — Rechtschreibung: Kaffee](https://www.duden.de/rechtschreibung/Kaffee) | Spelling, gender, singular, and plural for the single lexical item 'Kaffee' (LEX-DE-001) only. | 2026-09-02 | COPYRIGHT_ALL_RIGHTS_RESERVED_REFERENCE_ONLY | ☐ citation scope approved ☐ revise |
| SRC-DE-005 | [Duden — Rechtschreibung: Tee](https://www.duden.de/rechtschreibung/Tee_Getraenk) | Spelling, gender, singular, and plural for the single lexical item 'Tee' (LEX-DE-002) only. | 2026-09-02 | COPYRIGHT_ALL_RIGHTS_RESERVED_REFERENCE_ONLY | ☐ citation scope approved ☐ revise |
| SRC-DE-006 | [Duden — Rechtschreibung: Apfelsaft](https://www.duden.de/rechtschreibung/Apfelsaft) | Spelling, gender, singular, and plural for the single lexical item 'Apfelsaft' (LEX-DE-003) only. | 2026-09-02 | COPYRIGHT_ALL_RIGHTS_RESERVED_REFERENCE_ONLY | ☐ citation scope approved ☐ revise |
| SRC-DE-007 | [Amtliches Regelwerk der deutschen Rechtschreibung — § 72](https://grammis.ids-mannheim.de/rechtschreibung/6202) | Communicative expressions such as 'bitte' may be integrated into the sentence or set off parenthetically; used only for VAR-DE-N1-02 and VAR-DE-N1-10. | 2026-09-02 | COPYRIGHT_ALL_RIGHTS_RESERVED_REFERENCE_ONLY | ☐ citation scope approved ☐ revise |

AI record `PROV-AI-WP02R` is `AI_GENERATED_AND_AI_REPAIRED_CANDIDATE` with `MULTI_PROVIDER_LINEAGE`. Human review is `PENDING` and project content license is `PROPRIETARY_ALL_RIGHTS_RESERVED`.

## Sign-off

- Qualified German reviewer: ____________________ Date: __________ Decision: ☐ approve ☐ revise ☐ reject
- Pedagogy/evidence reviewer: __________________ Date: __________ Decision: ☐ approve ☐ revise ☐ reject
- License owner decision: ______________________ Date: __________ Decision: ☐ approve ☐ revise ☐ reject
- Audio reviewer (after recording): _____________ Date: __________ Decision: ☐ approve ☐ revise ☐ reject

## Canonical technical appendix

The JSON between the markers is the exact trimmed body of Artifact 1 and is included for record-level reviewer traceability.

<!-- CANONICAL_JSON_BEGIN -->
```json
{
  "$schema": "./living_language_atlas_wp02_content_pack_v2_1.schema.json",
  "content_pack_id": "de-DE-counter-n1-n2-002-draft",
  "content_version": "2.1.0-candidate",
  "evidence_policy_version": "1.1",
  "instruction_locale": "en",
  "target_locale": "de-DE",
  "release_gate": "BLOCKED_PENDING_HUMAN_REVIEW",
  "manifest": {
    "node_count": 2,
    "skill_count": 2,
    "lexical_item_count": 15,
    "phrase_rubric_count": 2,
    "accepted_variant_count": 21,
    "noncanonical_form_count": 6,
    "activity_count": 16,
    "bundle_count": 4,
    "evaluation_fixture_count": 27,
    "audio_script_count": 10,
    "external_source_count": 7,
    "ai_provenance_count": 1
  },
  "nodes": [
    {
      "node_id": "NODE-N1",
      "district_id": "FOOD_AND_SERVICE",
      "route_id": "AT_THE_COUNTER",
      "title_en": "Ask for one thing",
      "primary_skill_id": "GER-SVC-REQUEST-ONE-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "node_id": "NODE-N2",
      "district_id": "FOOD_AND_SERVICE",
      "route_id": "AT_THE_COUNTER",
      "title_en": "When you do not understand",
      "primary_skill_id": "GER-SVC-REPAIR-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    }
  ],
  "skills": [
    {
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "instruction_language_tag": "en",
      "target_language_tag": "de",
      "canonical_variety": "de-DE",
      "internal_band": "BEGINNER_0",
      "curriculum_band": "PRE_A1_CORE",
      "cefr_alignment": "PRE_A1",
      "cefr_alignment_status": "PROVISIONAL_REFERENCE",
      "cefr_alignment_scope_notes": "Provisional reference strictly limited to visible or pre-taught items in simple transactional service requests.",
      "can_do_en": "Can politely request a single visible or pre-taught item in an adult service counter interaction using a simple accusative formula with please.",
      "intent_code": "SERVICE_REQUEST_ONE",
      "context_family": "FOOD_AND_SERVICE_COUNTER",
      "register_requirement": "POLITE_FORMAL_SIE",
      "prerequisite_skill_ids": [],
      "modalities": [
        "read_recognition",
        "typed_production"
      ],
      "active_production_frame": "Einen [reviewed masculine item], bitte.",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "skill_id": "GER-SVC-REPAIR-01",
      "instruction_language_tag": "en",
      "target_language_tag": "de",
      "canonical_variety": "de-DE",
      "internal_band": "BEGINNER_0",
      "curriculum_band": "EARLY_A1_BRIDGE",
      "cefr_alignment": null,
      "cefr_alignment_status": "PENDING_HUMAN_REVIEW",
      "cefr_alignment_scope_notes": "CEFR Companion Volume has no Pre-A1 descriptor for asking clarification. Treated as early-A1 bridge; not presented as Pre-A1 certified.",
      "can_do_en": "Can select or type a short German repair formula (such as 'Wie bitte?') in a written service-interaction simulation when input is missed or not understood.",
      "intent_code": "COMMUNICATION_REPAIR",
      "context_family": "FOOD_AND_SERVICE_COUNTER",
      "register_requirement": "POLITE_FORMAL_SIE",
      "prerequisite_skill_ids": [],
      "modalities": [
        "read_recognition",
        "typed_production"
      ],
      "active_production_frame": "Wie bitte?",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    }
  ],
  "lexical_items": [
    {
      "item_id": "LEX-DE-001",
      "lemma": "Kaffee",
      "display_form": "der Kaffee",
      "pos": "NOUN",
      "gender": "MASCULINE",
      "singular": "der Kaffee",
      "plural": "die Kaffees",
      "meaning_en": "coffee",
      "target_function": "N1_REQUEST_ITEM_ACTIVE",
      "familiarity_status": "PRETAUGHT_ACCEPTED",
      "setting_scope": "COUNTER_SERVICE",
      "orthography_notes": "Capitalized masculine noun.",
      "version": "2.1.0",
      "provenance_ref": "SRC-DE-004",
      "review_status": "candidate_pending_human_review"
    },
    {
      "item_id": "LEX-DE-002",
      "lemma": "Tee",
      "display_form": "der Tee",
      "pos": "NOUN",
      "gender": "MASCULINE",
      "singular": "der Tee",
      "plural": "die Tees",
      "meaning_en": "tea",
      "target_function": "N1_REQUEST_ITEM_ACTIVE",
      "familiarity_status": "PRETAUGHT_ACCEPTED",
      "setting_scope": "COUNTER_SERVICE",
      "orthography_notes": "Capitalized masculine noun.",
      "version": "2.1.0",
      "provenance_ref": "SRC-DE-005",
      "review_status": "candidate_pending_human_review"
    },
    {
      "item_id": "LEX-DE-003",
      "lemma": "Apfelsaft",
      "display_form": "der Apfelsaft",
      "pos": "NOUN",
      "gender": "MASCULINE",
      "singular": "der Apfelsaft",
      "plural": "die Apfelsäfte",
      "meaning_en": "apple juice",
      "target_function": "N1_REQUEST_ITEM_ACTIVE",
      "familiarity_status": "VISIBLE_IN_NATURAL_CONTEXT",
      "setting_scope": "COUNTER_SERVICE",
      "orthography_notes": "Compound masculine noun; capitalized.",
      "version": "2.1.0",
      "provenance_ref": "SRC-DE-006",
      "review_status": "candidate_pending_human_review"
    },
    {
      "item_id": "LEX-DE-004",
      "lemma": "bitte",
      "display_form": "bitte",
      "pos": "ADVERB_PARTICLE",
      "gender": null,
      "singular": null,
      "plural": null,
      "meaning_en": "please",
      "target_function": "POLITENESS_MARKER",
      "familiarity_status": "PRETAUGHT_ACCEPTED",
      "setting_scope": "UNIVERSAL_SERVICE",
      "orthography_notes": "Lowercase unless sentence-initial.",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "item_id": "LEX-DE-005",
      "lemma": "danke",
      "display_form": "danke",
      "pos": "INTERJECTION_PARTICLE",
      "gender": null,
      "singular": null,
      "plural": null,
      "meaning_en": "thank you",
      "target_function": "POLITENESS_MARKER",
      "familiarity_status": "PRETAUGHT_ACCEPTED",
      "setting_scope": "UNIVERSAL_SERVICE",
      "orthography_notes": "Lowercase unless sentence-initial.",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "item_id": "LEX-DE-006",
      "lemma": "ein-",
      "display_form": "einen",
      "pos": "INDEFINITE_ARTICLE",
      "gender": "MASCULINE",
      "singular": "einen",
      "plural": null,
      "meaning_en": "a / an (masculine accusative)",
      "target_function": "ACCUSATIVE_DETERMINER",
      "familiarity_status": "PRETAUGHT_ACCEPTED",
      "setting_scope": "COUNTER_SERVICE",
      "orthography_notes": "Masculine accusative indefinite article.",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "item_id": "LEX-DE-007",
      "lemma": "wie",
      "display_form": "wie",
      "pos": "ADVERB",
      "gender": null,
      "singular": null,
      "plural": null,
      "meaning_en": "how / pardon (in 'Wie bitte?')",
      "target_function": "N2_REPAIR_CHUNK_ACTIVE",
      "familiarity_status": "PRETAUGHT_ACCEPTED",
      "setting_scope": "UNIVERSAL_SERVICE",
      "orthography_notes": "Capitalized when sentence-initial in 'Wie bitte?'.",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "item_id": "LEX-DE-008",
      "lemma": "möchten",
      "display_form": "möchte",
      "pos": "VERB_MODAL",
      "gender": null,
      "singular": "ich möchte",
      "plural": null,
      "meaning_en": "would like",
      "target_function": "N1_REQUEST_FRAME_PASSIVE",
      "familiarity_status": "PREVIOUSLY_RECOGNIZED",
      "setting_scope": "UNIVERSAL_SERVICE",
      "orthography_notes": "Umlaut ö; ASCII moechte accepted under keyboard fallback.",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "item_id": "LEX-DE-009",
      "lemma": "noch",
      "display_form": "noch",
      "pos": "ADVERB",
      "gender": null,
      "singular": null,
      "plural": null,
      "meaning_en": "still / yet / again",
      "target_function": "N2_REPAIR_CHUNK_PASSIVE",
      "familiarity_status": "PREVIOUSLY_RECOGNIZED",
      "setting_scope": "UNIVERSAL_SERVICE",
      "orthography_notes": "Part of passive repair variant 'Noch einmal, bitte.'.",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "item_id": "LEX-DE-010",
      "lemma": "einmal",
      "display_form": "einmal",
      "pos": "ADVERB",
      "gender": null,
      "singular": null,
      "plural": null,
      "meaning_en": "once",
      "target_function": "N2_REPAIR_CHUNK_PASSIVE",
      "familiarity_status": "PREVIOUSLY_RECOGNIZED",
      "setting_scope": "UNIVERSAL_SERVICE",
      "orthography_notes": "Part of passive repair variant 'Noch einmal, bitte.'.",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "item_id": "LEX-DE-011",
      "lemma": "langsam",
      "display_form": "langsamer",
      "pos": "ADJECTIVE_ADVERB",
      "gender": null,
      "singular": null,
      "plural": null,
      "meaning_en": "more slowly",
      "target_function": "N2_REPAIR_CHUNK_PASSIVE",
      "familiarity_status": "PREVIOUSLY_RECOGNIZED",
      "setting_scope": "UNIVERSAL_SERVICE",
      "orthography_notes": "Comparative form 'langsamer'.",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "item_id": "LEX-DE-012",
      "lemma": "verstehen",
      "display_form": "verstanden",
      "pos": "VERB",
      "gender": null,
      "singular": null,
      "plural": null,
      "meaning_en": "understood",
      "target_function": "N2_REPAIR_CHUNK_PASSIVE",
      "familiarity_status": "PREVIOUSLY_RECOGNIZED",
      "setting_scope": "UNIVERSAL_SERVICE",
      "orthography_notes": "Part of passive variant 'Das habe ich nicht verstanden.'.",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "item_id": "LEX-DE-013",
      "lemma": "nicht",
      "display_form": "nicht",
      "pos": "PARTICLE",
      "gender": null,
      "singular": null,
      "plural": null,
      "meaning_en": "not",
      "target_function": "NEGATION_PARTICLE",
      "familiarity_status": "PREVIOUSLY_RECOGNIZED",
      "setting_scope": "UNIVERSAL_SERVICE",
      "orthography_notes": "Standard negation particle.",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "item_id": "LEX-DE-014",
      "lemma": "Guten Tag",
      "display_form": "Guten Tag",
      "pos": "PHRASE",
      "gender": null,
      "singular": null,
      "plural": null,
      "meaning_en": "hello / good day",
      "target_function": "GREETING_FORMULA",
      "familiarity_status": "PRETAUGHT_ACCEPTED",
      "setting_scope": "UNIVERSAL_SERVICE",
      "orthography_notes": "Formulaic greeting; capitalized.",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "item_id": "LEX-DE-015",
      "lemma": "Hallo",
      "display_form": "Hallo",
      "pos": "INTERJECTION",
      "gender": null,
      "singular": null,
      "plural": null,
      "meaning_en": "hello / hi",
      "target_function": "GREETING_FORMULA",
      "familiarity_status": "PRETAUGHT_ACCEPTED",
      "setting_scope": "UNIVERSAL_SERVICE",
      "orthography_notes": "Formulaic greeting; capitalized.",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    }
  ],
  "phrase_rubrics": [
    {
      "rubric_id": "RUBRIC-DE-N1-REQ-01",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "setting": "counter_service",
      "canonical_candidate": "Einen Kaffee, bitte.",
      "intended_meaning_en": "A coffee, please.",
      "normalization_profile": "UNICODE_NFC_TRIM_COLLAPSE_WHITESPACE",
      "ascii_keyboard_policy": "TARGET_SPECIFIC_VARIANT_ONLY",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "accepted_variants": [
        {
          "variant_id": "VAR-DE-N1-01",
          "surface_form": "Einen Kaffee, bitte.",
          "intended_item_id": "LEX-DE-001",
          "teaching_role": "ACTIVE_TARGET",
          "evaluation_outcome": "accepted_clean",
          "intent_outcome": "achieved",
          "form_outcome": "acceptable",
          "register_outcome": "appropriate",
          "error_codes": [],
          "evaluator_confidence_bucket": "HIGH_DETERMINISTIC",
          "task_success_allowed": true,
          "form_evidence_allowed": true,
          "automatic_release_evidence_eligible": false,
          "notes": "Exact canonical candidate with standard punctuation.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review"
        },
        {
          "variant_id": "VAR-DE-N1-02",
          "surface_form": "Einen Kaffee bitte",
          "intended_item_id": "LEX-DE-001",
          "teaching_role": "PASSIVE_ACCEPTED",
          "evaluation_outcome": "accepted_clean",
          "intent_outcome": "achieved",
          "form_outcome": "acceptable",
          "register_outcome": "appropriate",
          "error_codes": [],
          "evaluator_confidence_bucket": "HIGH_RULED_MINOR",
          "task_success_allowed": true,
          "form_evidence_allowed": true,
          "automatic_release_evidence_eligible": false,
          "notes": "Comma omitted before bitte in formulaic closing chunk under official §72 allowance; accepted clean.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review",
          "rule_source_refs": [
            "SRC-DE-007"
          ]
        },
        {
          "variant_id": "VAR-DE-N1-03",
          "surface_form": "Guten Tag, einen Kaffee, bitte.",
          "intended_item_id": "LEX-DE-001",
          "teaching_role": "PASSIVE_ACCEPTED",
          "evaluation_outcome": "accepted_clean",
          "intent_outcome": "achieved",
          "form_outcome": "acceptable",
          "register_outcome": "appropriate",
          "error_codes": [],
          "evaluator_confidence_bucket": "REVIEW_REQUIRED",
          "task_success_allowed": true,
          "form_evidence_allowed": true,
          "automatic_release_evidence_eligible": false,
          "notes": "Formal greeting prepended; register and naturalness pending human review.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review"
        },
        {
          "variant_id": "VAR-DE-N1-04",
          "surface_form": "Hallo, einen Kaffee, bitte.",
          "intended_item_id": "LEX-DE-001",
          "teaching_role": "PASSIVE_ACCEPTED",
          "evaluation_outcome": "accepted_clean",
          "intent_outcome": "achieved",
          "form_outcome": "acceptable",
          "register_outcome": "appropriate",
          "error_codes": [],
          "evaluator_confidence_bucket": "REVIEW_REQUIRED",
          "task_success_allowed": true,
          "form_evidence_allowed": true,
          "automatic_release_evidence_eligible": false,
          "notes": "Friendly greeting prepended; naturalness pending human review.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review"
        },
        {
          "variant_id": "VAR-DE-N1-05",
          "surface_form": "Ich möchte einen Kaffee, bitte.",
          "intended_item_id": "LEX-DE-001",
          "teaching_role": "PASSIVE_ACCEPTED",
          "evaluation_outcome": "accepted_clean",
          "intent_outcome": "achieved",
          "form_outcome": "acceptable",
          "register_outcome": "appropriate",
          "error_codes": [],
          "evaluator_confidence_bucket": "REVIEW_REQUIRED",
          "task_success_allowed": true,
          "form_evidence_allowed": true,
          "automatic_release_evidence_eligible": false,
          "notes": "Polite modal frame accepted as passive candidate; human review pending.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review"
        },
        {
          "variant_id": "VAR-DE-N1-06",
          "surface_form": "Ich hätte gern einen Kaffee, bitte.",
          "intended_item_id": "LEX-DE-001",
          "teaching_role": "PASSIVE_ACCEPTED",
          "evaluation_outcome": "accepted_clean",
          "intent_outcome": "achieved",
          "form_outcome": "acceptable",
          "register_outcome": "appropriate",
          "error_codes": [],
          "evaluator_confidence_bucket": "REVIEW_REQUIRED",
          "task_success_allowed": true,
          "form_evidence_allowed": true,
          "automatic_release_evidence_eligible": false,
          "notes": "Polite subjunctive II frame accepted as passive candidate; human review pending.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review"
        },
        {
          "variant_id": "VAR-DE-N1-07",
          "surface_form": "Ein Kaffee, bitte.",
          "intended_item_id": "LEX-DE-001",
          "teaching_role": "REVIEW_REQUIRED_NONCANONICAL",
          "evaluation_outcome": "accepted_minor",
          "intent_outcome": "achieved",
          "form_outcome": "minor_issue",
          "register_outcome": "appropriate",
          "error_codes": [
            "ARTICLE_GENDER_CASE"
          ],
          "evaluator_confidence_bucket": "REVIEW_REQUIRED",
          "task_success_allowed": true,
          "form_evidence_allowed": false,
          "automatic_release_evidence_eligible": false,
          "notes": "Nominative substitution; intent achieved; exact form severity pending human review.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review"
        },
        {
          "variant_id": "VAR-DE-N1-08",
          "surface_form": "Einen Tee, bitte.",
          "intended_item_id": "LEX-DE-002",
          "teaching_role": "ACTIVE_TARGET",
          "evaluation_outcome": "accepted_clean",
          "intent_outcome": "achieved",
          "form_outcome": "acceptable",
          "register_outcome": "appropriate",
          "error_codes": [],
          "evaluator_confidence_bucket": "HIGH_DETERMINISTIC",
          "task_success_allowed": true,
          "form_evidence_allowed": true,
          "automatic_release_evidence_eligible": false,
          "notes": "Canonical request for Tee target.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review"
        },
        {
          "variant_id": "VAR-DE-N1-09",
          "surface_form": "Einen Apfelsaft, bitte.",
          "intended_item_id": "LEX-DE-003",
          "teaching_role": "ACTIVE_TARGET",
          "evaluation_outcome": "accepted_clean",
          "intent_outcome": "achieved",
          "form_outcome": "acceptable",
          "register_outcome": "appropriate",
          "error_codes": [],
          "evaluator_confidence_bucket": "HIGH_DETERMINISTIC",
          "task_success_allowed": true,
          "form_evidence_allowed": true,
          "automatic_release_evidence_eligible": false,
          "notes": "Canonical request for Apfelsaft target.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review"
        },
        {
          "variant_id": "VAR-DE-N1-10",
          "surface_form": "Einen Apfelsaft bitte",
          "intended_item_id": "LEX-DE-003",
          "teaching_role": "PASSIVE_ACCEPTED",
          "evaluation_outcome": "accepted_clean",
          "intent_outcome": "achieved",
          "form_outcome": "acceptable",
          "register_outcome": "appropriate",
          "error_codes": [],
          "evaluator_confidence_bucket": "HIGH_RULED_MINOR",
          "task_success_allowed": true,
          "form_evidence_allowed": true,
          "automatic_release_evidence_eligible": false,
          "notes": "Comma omitted for Apfelsaft target; accepted clean under §72.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review",
          "rule_source_refs": [
            "SRC-DE-007"
          ]
        },
        {
          "variant_id": "VAR-DE-N1-11",
          "surface_form": "Ein Apfelsaft, bitte.",
          "intended_item_id": "LEX-DE-003",
          "teaching_role": "REVIEW_REQUIRED_NONCANONICAL",
          "evaluation_outcome": "accepted_minor",
          "intent_outcome": "achieved",
          "form_outcome": "minor_issue",
          "register_outcome": "appropriate",
          "error_codes": [
            "ARTICLE_GENDER_CASE"
          ],
          "evaluator_confidence_bucket": "REVIEW_REQUIRED",
          "task_success_allowed": true,
          "form_evidence_allowed": false,
          "automatic_release_evidence_eligible": false,
          "notes": "Nominative substitution for Apfelsaft; intent achieved; form classification pending review.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review"
        },
        {
          "variant_id": "VAR-DE-N1-12",
          "surface_form": "Ich moechte einen Kaffee, bitte.",
          "intended_item_id": "LEX-DE-001",
          "teaching_role": "PASSIVE_ACCEPTED",
          "evaluation_outcome": "accepted_minor",
          "intent_outcome": "achieved",
          "form_outcome": "minor_issue",
          "register_outcome": "appropriate",
          "error_codes": [
            "KEYBOARD_CONSTRAINT"
          ],
          "evaluator_confidence_bucket": "HIGH_RULED_MINOR",
          "task_success_allowed": true,
          "form_evidence_allowed": false,
          "automatic_release_evidence_eligible": false,
          "notes": "Target-specific ASCII fallback (oe -> ö); communicative intent achieved without orthography credit.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review"
        }
      ],
      "noncanonical_forms": [
        {
          "noncanonical_id": "NONCAN-DE-N1-01",
          "form": "Kaffee!",
          "intended_item_id": "LEX-DE-001",
          "teaching_role": "OFF_TASK",
          "error_codes": [
            "MISSING_POLITENESS_MARKER"
          ],
          "evaluation_outcome": "failed_critical",
          "intent_outcome": "partial",
          "form_outcome": "minor_issue",
          "register_outcome": "mismatch",
          "reason": "Missing determiner and politeness marker; inadequate for polite adult service counter.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review"
        },
        {
          "noncanonical_id": "NONCAN-DE-N1-02",
          "form": "Ich will einen Kaffee.",
          "intended_item_id": "LEX-DE-001",
          "teaching_role": "REJECTED_NONCANONICAL",
          "error_codes": [
            "REGISTER_TOO_DIRECT"
          ],
          "evaluation_outcome": "failed_critical",
          "intent_outcome": "achieved",
          "form_outcome": "acceptable",
          "register_outcome": "mismatch",
          "reason": "Grammatically well-formed and semantically clear, but 'Ich will ...' is too demanding for the declared polite adult Sie counter interaction. Route the learner to a polite request model.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review",
          "evaluator_confidence_bucket": "HIGH_DETERMINISTIC",
          "automatic_release_evidence_eligible": false
        },
        {
          "noncanonical_id": "NONCAN-DE-N1-03",
          "form": "Gib mir einen Kaffee.",
          "intended_item_id": "LEX-DE-001",
          "teaching_role": "REJECTED_NONCANONICAL",
          "error_codes": [
            "INFORMAL_IMPERATIVE",
            "REGISTER_DU_SIE_MISMATCH",
            "MISSING_POLITENESS_MARKER"
          ],
          "evaluation_outcome": "failed_critical",
          "intent_outcome": "achieved",
          "form_outcome": "acceptable",
          "register_outcome": "mismatch",
          "reason": "Grammatically well-formed informal imperative, but it conflicts with the declared Sie service register and lacks a politeness marker. Route the learner to a polite request model.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review",
          "evaluator_confidence_bucket": "HIGH_DETERMINISTIC",
          "automatic_release_evidence_eligible": false
        }
      ]
    },
    {
      "rubric_id": "RUBRIC-DE-N2-REP-01",
      "skill_id": "GER-SVC-REPAIR-01",
      "setting": "counter_service",
      "canonical_candidate": "Wie bitte?",
      "intended_meaning_en": "Pardon? / Could you repeat that?",
      "normalization_profile": "UNICODE_NFC_TRIM_COLLAPSE_WHITESPACE",
      "ascii_keyboard_policy": "STANDARD_NFC",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "accepted_variants": [
        {
          "variant_id": "VAR-DE-N2-01",
          "surface_form": "Wie bitte?",
          "intended_item_id": "LEX-DE-007",
          "teaching_role": "ACTIVE_TARGET",
          "evaluation_outcome": "accepted_clean",
          "intent_outcome": "achieved",
          "form_outcome": "acceptable",
          "register_outcome": "appropriate",
          "error_codes": [],
          "evaluator_confidence_bucket": "HIGH_DETERMINISTIC",
          "task_success_allowed": true,
          "form_evidence_allowed": true,
          "automatic_release_evidence_eligible": false,
          "notes": "Exact canonical repair formula.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review"
        },
        {
          "variant_id": "VAR-DE-N2-02",
          "surface_form": "Wie bitte",
          "intended_item_id": "LEX-DE-007",
          "teaching_role": "PASSIVE_ACCEPTED",
          "evaluation_outcome": "accepted_clean",
          "intent_outcome": "achieved",
          "form_outcome": "acceptable",
          "register_outcome": "appropriate",
          "error_codes": [],
          "evaluator_confidence_bucket": "REVIEW_REQUIRED",
          "task_success_allowed": true,
          "form_evidence_allowed": true,
          "automatic_release_evidence_eligible": false,
          "notes": "Question mark omitted in typed simulation; task intent achieved, punctuation policy pending human review.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review",
          "rule_source_refs": [
            "SRC-DE-003"
          ]
        },
        {
          "variant_id": "VAR-DE-N2-03",
          "surface_form": "Entschuldigung, wie bitte?",
          "intended_item_id": "LEX-DE-007",
          "teaching_role": "PASSIVE_ACCEPTED",
          "evaluation_outcome": "accepted_clean",
          "intent_outcome": "achieved",
          "form_outcome": "acceptable",
          "register_outcome": "appropriate",
          "error_codes": [],
          "evaluator_confidence_bucket": "REVIEW_REQUIRED",
          "task_success_allowed": true,
          "form_evidence_allowed": true,
          "automatic_release_evidence_eligible": false,
          "notes": "Polite apology prefix included; human review pending.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review"
        },
        {
          "variant_id": "VAR-DE-N2-04",
          "surface_form": "Noch einmal, bitte.",
          "intended_item_id": "LEX-DE-009",
          "teaching_role": "PASSIVE_ACCEPTED",
          "evaluation_outcome": "accepted_clean",
          "intent_outcome": "achieved",
          "form_outcome": "acceptable",
          "register_outcome": "appropriate",
          "error_codes": [],
          "evaluator_confidence_bucket": "REVIEW_REQUIRED",
          "task_success_allowed": true,
          "form_evidence_allowed": true,
          "automatic_release_evidence_eligible": false,
          "notes": "Repetition formula accepted as clean variant; human review pending.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review"
        },
        {
          "variant_id": "VAR-DE-N2-05",
          "surface_form": "Bitte noch einmal.",
          "intended_item_id": "LEX-DE-009",
          "teaching_role": "PASSIVE_ACCEPTED",
          "evaluation_outcome": "accepted_clean",
          "intent_outcome": "achieved",
          "form_outcome": "acceptable",
          "register_outcome": "appropriate",
          "error_codes": [],
          "evaluator_confidence_bucket": "REVIEW_REQUIRED",
          "task_success_allowed": true,
          "form_evidence_allowed": true,
          "automatic_release_evidence_eligible": false,
          "notes": "Word order variant of repetition formula; human review pending.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review"
        },
        {
          "variant_id": "VAR-DE-N2-06",
          "surface_form": "Etwas langsamer, bitte.",
          "intended_item_id": "LEX-DE-011",
          "teaching_role": "PASSIVE_ACCEPTED",
          "evaluation_outcome": "accepted_clean",
          "intent_outcome": "achieved",
          "form_outcome": "acceptable",
          "register_outcome": "appropriate",
          "error_codes": [],
          "evaluator_confidence_bucket": "REVIEW_REQUIRED",
          "task_success_allowed": true,
          "form_evidence_allowed": true,
          "automatic_release_evidence_eligible": false,
          "notes": "Speed reduction formula accepted clean; human review pending.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review"
        },
        {
          "variant_id": "VAR-DE-N2-07",
          "surface_form": "Langsamer, bitte.",
          "intended_item_id": "LEX-DE-011",
          "teaching_role": "PASSIVE_ACCEPTED",
          "evaluation_outcome": "accepted_clean",
          "intent_outcome": "achieved",
          "form_outcome": "acceptable",
          "register_outcome": "appropriate",
          "error_codes": [],
          "evaluator_confidence_bucket": "REVIEW_REQUIRED",
          "task_success_allowed": true,
          "form_evidence_allowed": true,
          "automatic_release_evidence_eligible": false,
          "notes": "Elliptical speed reduction formula accepted clean; human review pending.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review"
        },
        {
          "variant_id": "VAR-DE-N2-08",
          "surface_form": "Das habe ich nicht verstanden.",
          "intended_item_id": "LEX-DE-012",
          "teaching_role": "PASSIVE_ACCEPTED",
          "evaluation_outcome": "accepted_clean",
          "intent_outcome": "achieved",
          "form_outcome": "acceptable",
          "register_outcome": "appropriate",
          "error_codes": [],
          "evaluator_confidence_bucket": "REVIEW_REQUIRED",
          "task_success_allowed": true,
          "form_evidence_allowed": true,
          "automatic_release_evidence_eligible": false,
          "notes": "Explicit statement of non-understanding accepted clean; human review pending.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review"
        },
        {
          "variant_id": "VAR-DE-N2-09",
          "surface_form": "Ich verstehe nicht.",
          "intended_item_id": "LEX-DE-012",
          "teaching_role": "PASSIVE_ACCEPTED",
          "evaluation_outcome": "accepted_clean",
          "intent_outcome": "achieved",
          "form_outcome": "acceptable",
          "register_outcome": "appropriate",
          "error_codes": [],
          "evaluator_confidence_bucket": "REVIEW_REQUIRED",
          "task_success_allowed": true,
          "form_evidence_allowed": true,
          "automatic_release_evidence_eligible": false,
          "notes": "Present tense non-understanding statement accepted clean; human review pending.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review"
        }
      ],
      "noncanonical_forms": [
        {
          "noncanonical_id": "NONCAN-DE-N2-01",
          "form": "Was?",
          "intended_item_id": "LEX-DE-007",
          "teaching_role": "REJECTED_NONCANONICAL",
          "error_codes": [
            "REGISTER_COLLOQUIAL_ABRUPT"
          ],
          "evaluation_outcome": "failed_critical",
          "intent_outcome": "achieved",
          "form_outcome": "acceptable",
          "register_outcome": "mismatch",
          "reason": "Signals non-understanding, but 'Was?' is too abrupt for the declared polite adult Sie service interaction. Route the learner to a clarification model.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review",
          "evaluator_confidence_bucket": "HIGH_DETERMINISTIC",
          "automatic_release_evidence_eligible": false
        },
        {
          "noncanonical_id": "NONCAN-DE-N2-02",
          "form": "Hä?",
          "intended_item_id": "LEX-DE-007",
          "teaching_role": "REJECTED_NONCANONICAL",
          "error_codes": [
            "REGISTER_COLLOQUIAL_ABRUPT"
          ],
          "evaluation_outcome": "failed_critical",
          "intent_outcome": "achieved",
          "form_outcome": "acceptable",
          "register_outcome": "mismatch",
          "reason": "Signals non-understanding, but 'Hä?' is overly colloquial for the declared polite adult Sie service interaction. Route the learner to a clarification model.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review",
          "evaluator_confidence_bucket": "HIGH_DETERMINISTIC",
          "automatic_release_evidence_eligible": false
        },
        {
          "noncanonical_id": "NONCAN-DE-N2-03",
          "form": "Nein danke.",
          "intended_item_id": "LEX-DE-007",
          "teaching_role": "OFF_TASK",
          "error_codes": [
            "OFF_TASK"
          ],
          "evaluation_outcome": "failed_critical",
          "intent_outcome": "not_achieved",
          "form_outcome": "acceptable",
          "register_outcome": "appropriate",
          "reason": "Refusal response when prompt specifically models communication breakdown.",
          "version": "2.1.0",
          "provenance_ref": "PROV-AI-WP02R",
          "review_status": "candidate_pending_human_review"
        }
      ]
    }
  ],
  "activities": [
    {
      "activity_id": "ACT-DE-N1-E0-01",
      "node_id": "NODE-N1",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "evidence_lane": "read_recognition",
      "learner_goal": "Observe a polite coffee order at a German counter.",
      "ui_copy_en": "At the Café Counter: Notice how a customer asks for a coffee politely.",
      "content_de": "Clerk: 'Guten Tag! Bitte schön?' / Customer: 'Einen Kaffee, bitte.' / Clerk: 'Kommt sofort!'",
      "stimulus_modality": "text",
      "response_modality": "selection",
      "support_level": "H4",
      "hint_types": [
        "model_dialogue"
      ],
      "answer_revealing_exposure": true,
      "evidence_capability": "E0",
      "deterministic_rule": "PASS_ON_CONTINUE",
      "feedback_policy": {
        "success_feedback_reveals_target": false,
        "repair_feedback_reveals_target": false,
        "reveal_event_type": "AnswerRevealingExposureRecorded",
        "immediate_retry_contaminated": true,
        "clean_delay_clock_reset": true
      },
      "success_feedback_en": "Study the model and continue when you are ready.",
      "repair_feedback_en": "",
      "context_vector": {
        "intent_code": "SERVICE_REQUEST_ONE",
        "venue": "cafe",
        "referent_or_information_slot": "coffee",
        "interlocutor": "clerk",
        "dialogue_position": "initial_order",
        "prompt_surface": "model_card",
        "stimulus_modality": "text",
        "distractor_set": "none"
      },
      "changed_dimensions": [],
      "required_familiarity_items": [
        {
          "item_id": "LEX-DE-001",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        },
        {
          "item_id": "LEX-DE-004",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        },
        {
          "item_id": "LEX-DE-006",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        }
      ],
      "content_dependencies": [
        "LEX-DE-001",
        "LEX-DE-004",
        "LEX-DE-006"
      ],
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "activity_id": "ACT-DE-N1-E1-01",
      "node_id": "NODE-N1",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "evidence_lane": "read_recognition",
      "learner_goal": "Identify the polite German phrase for ordering coffee.",
      "ui_copy_en": "Which phrase means 'A coffee, please'?",
      "content_de": "A: Einen Kaffee, bitte. | B: Guten Tag. | C: Auf Wiedersehen. | D: Nicht Kaffee.",
      "choices": [
        {
          "choice_id": "CHOICE-A",
          "text_de": "Einen Kaffee, bitte.",
          "is_correct": true
        },
        {
          "choice_id": "CHOICE-B",
          "text_de": "Guten Tag.",
          "is_correct": false
        },
        {
          "choice_id": "CHOICE-C",
          "text_de": "Auf Wiedersehen.",
          "is_correct": false
        },
        {
          "choice_id": "CHOICE-D",
          "text_de": "Nicht Kaffee.",
          "is_correct": false
        }
      ],
      "stimulus_modality": "text",
      "response_modality": "selection",
      "support_level": "H1",
      "hint_types": [
        "situational_goal_en"
      ],
      "answer_revealing_exposure": false,
      "evidence_capability": "E1",
      "deterministic_rule": "EXACT_MATCH_CHOICE_A",
      "feedback_policy": {
        "success_feedback_reveals_target": false,
        "repair_feedback_reveals_target": true,
        "reveal_event_type": "AnswerRevealingExposureRecorded",
        "immediate_retry_contaminated": true,
        "clean_delay_clock_reset": true
      },
      "success_feedback_en": "Correct. That option fits the service-counter goal.",
      "repair_feedback_en": "Look for 'Kaffee' with the polite ending 'bitte'.",
      "context_vector": {
        "intent_code": "SERVICE_REQUEST_ONE",
        "venue": "cafe",
        "referent_or_information_slot": "coffee",
        "interlocutor": "clerk",
        "dialogue_position": "order_selection",
        "prompt_surface": "four_choice_item",
        "stimulus_modality": "text",
        "distractor_set": "greeting_closing_negation"
      },
      "changed_dimensions": [],
      "required_familiarity_items": [
        {
          "item_id": "LEX-DE-001",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        },
        {
          "item_id": "LEX-DE-004",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        },
        {
          "item_id": "LEX-DE-006",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        }
      ],
      "content_dependencies": [
        "LEX-DE-001",
        "LEX-DE-004",
        "LEX-DE-006"
      ],
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "activity_id": "ACT-DE-N1-E1-02",
      "node_id": "NODE-N1",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "evidence_lane": "read_recognition",
      "learner_goal": "Identify the polite German phrase for ordering tea.",
      "ui_copy_en": "You want tea. Which phrase orders tea politely?",
      "content_de": "A: Guten Morgen. | B: Einen Tee, bitte. | C: Nein, danke. | D: Einen Kaffee, bitte.",
      "choices": [
        {
          "choice_id": "CHOICE-A",
          "text_de": "Guten Morgen.",
          "is_correct": false
        },
        {
          "choice_id": "CHOICE-B",
          "text_de": "Einen Tee, bitte.",
          "is_correct": true
        },
        {
          "choice_id": "CHOICE-C",
          "text_de": "Nein, danke.",
          "is_correct": false
        },
        {
          "choice_id": "CHOICE-D",
          "text_de": "Einen Kaffee, bitte.",
          "is_correct": false
        }
      ],
      "stimulus_modality": "text",
      "response_modality": "selection",
      "support_level": "H1",
      "hint_types": [
        "situational_goal_en"
      ],
      "answer_revealing_exposure": false,
      "evidence_capability": "E1",
      "deterministic_rule": "EXACT_MATCH_CHOICE_B",
      "feedback_policy": {
        "success_feedback_reveals_target": false,
        "repair_feedback_reveals_target": true,
        "reveal_event_type": "AnswerRevealingExposureRecorded",
        "immediate_retry_contaminated": true,
        "clean_delay_clock_reset": true
      },
      "success_feedback_en": "Correct. That option politely requests the intended drink.",
      "repair_feedback_en": "Choose 'Einen Tee, bitte' when ordering tea.",
      "context_vector": {
        "intent_code": "SERVICE_REQUEST_ONE",
        "venue": "cafe",
        "referent_or_information_slot": "tea",
        "interlocutor": "clerk",
        "dialogue_position": "order_selection",
        "prompt_surface": "four_choice_item",
        "stimulus_modality": "text",
        "distractor_set": "greeting_refusal_other_item"
      },
      "changed_dimensions": [],
      "required_familiarity_items": [
        {
          "item_id": "LEX-DE-002",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        },
        {
          "item_id": "LEX-DE-004",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        },
        {
          "item_id": "LEX-DE-006",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        }
      ],
      "content_dependencies": [
        "LEX-DE-002",
        "LEX-DE-004",
        "LEX-DE-006"
      ],
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "activity_id": "ACT-DE-N1-E1-03",
      "node_id": "NODE-N1",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "evidence_lane": "read_recognition",
      "learner_goal": "Distinguish an appropriate polite request from overly direct alternatives.",
      "ui_copy_en": "Which option is an appropriate polite request at the counter?",
      "content_de": "A: Kaffee! | B: Ich will Kaffee. | C: Einen Kaffee, bitte. | D: Gib Kaffee.",
      "choices": [
        {
          "choice_id": "CHOICE-A",
          "text_de": "Kaffee!",
          "is_correct": false
        },
        {
          "choice_id": "CHOICE-B",
          "text_de": "Ich will Kaffee.",
          "is_correct": false
        },
        {
          "choice_id": "CHOICE-C",
          "text_de": "Einen Kaffee, bitte.",
          "is_correct": true
        },
        {
          "choice_id": "CHOICE-D",
          "text_de": "Gib Kaffee.",
          "is_correct": false
        }
      ],
      "stimulus_modality": "text",
      "response_modality": "selection",
      "support_level": "H1",
      "hint_types": [
        "situational_goal_en"
      ],
      "answer_revealing_exposure": false,
      "evidence_capability": "E1",
      "deterministic_rule": "EXACT_MATCH_CHOICE_C",
      "feedback_policy": {
        "success_feedback_reveals_target": false,
        "repair_feedback_reveals_target": true,
        "reveal_event_type": "AnswerRevealingExposureRecorded",
        "immediate_retry_contaminated": true,
        "clean_delay_clock_reset": true
      },
      "success_feedback_en": "Correct. That option is appropriate for the service-counter situation.",
      "repair_feedback_en": "In service situations, 'Einen Kaffee, bitte' provides the expected level of politeness.",
      "context_vector": {
        "intent_code": "SERVICE_REQUEST_ONE",
        "venue": "cafe",
        "referent_or_information_slot": "coffee",
        "interlocutor": "clerk",
        "dialogue_position": "order_selection",
        "prompt_surface": "four_choice_item",
        "stimulus_modality": "text",
        "distractor_set": "isolated_noun_direct_modal_imperative"
      },
      "changed_dimensions": [],
      "required_familiarity_items": [
        {
          "item_id": "LEX-DE-001",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        },
        {
          "item_id": "LEX-DE-004",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        },
        {
          "item_id": "LEX-DE-006",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        }
      ],
      "content_dependencies": [
        "LEX-DE-001",
        "LEX-DE-004",
        "LEX-DE-006"
      ],
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "activity_id": "ACT-DE-N1-E2-01",
      "node_id": "NODE-N1",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "evidence_lane": "typed_production",
      "learner_goal": "Build a polite coffee order using word tiles.",
      "ui_copy_en": "Arrange the words to say: 'A coffee, please.'",
      "content_de": "Tokens: [bitte.] [Einen] [Kaffee,] [Tee,] [Guten]",
      "tokens": [
        {
          "token_id": "TOK-01",
          "text": "Einen"
        },
        {
          "token_id": "TOK-02",
          "text": "Kaffee,"
        },
        {
          "token_id": "TOK-03",
          "text": "bitte."
        },
        {
          "token_id": "TOK-04",
          "text": "Tee,"
        },
        {
          "token_id": "TOK-05",
          "text": "Guten"
        }
      ],
      "target_token_sequence": [
        "TOK-01",
        "TOK-02",
        "TOK-03"
      ],
      "stimulus_modality": "text",
      "response_modality": "construction",
      "support_level": "H3",
      "hint_types": [
        "word_bank"
      ],
      "answer_revealing_exposure": false,
      "evidence_capability": "E2",
      "deterministic_rule": "TOKEN_ORDER_EINEN_KAFFEE_BITTE",
      "feedback_policy": {
        "success_feedback_reveals_target": false,
        "repair_feedback_reveals_target": true,
        "reveal_event_type": "AnswerRevealingExposureRecorded",
        "immediate_retry_contaminated": true,
        "clean_delay_clock_reset": true
      },
      "success_feedback_en": "Correct. The word sequence forms a complete polite request.",
      "repair_feedback_en": "Arrange: 'Einen' + 'Kaffee,' + 'bitte.'.",
      "context_vector": {
        "intent_code": "SERVICE_REQUEST_ONE",
        "venue": "cafe",
        "referent_or_information_slot": "coffee",
        "interlocutor": "clerk",
        "dialogue_position": "supported_build",
        "prompt_surface": "token_bank",
        "stimulus_modality": "text",
        "distractor_set": "lexical_distractors"
      },
      "changed_dimensions": [],
      "required_familiarity_items": [
        {
          "item_id": "LEX-DE-001",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        },
        {
          "item_id": "LEX-DE-004",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        },
        {
          "item_id": "LEX-DE-006",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        }
      ],
      "content_dependencies": [
        "LEX-DE-001",
        "LEX-DE-004",
        "LEX-DE-006"
      ],
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "activity_id": "ACT-DE-N1-E2-02",
      "node_id": "NODE-N1",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "evidence_lane": "typed_production",
      "learner_goal": "Type the missing politeness word to complete a tea order.",
      "ui_copy_en": "Complete the polite order for tea: 'Einen Tee, ______.'",
      "content_de": "Prompt: 'Einen Tee, ______.' / Target: 'bitte'",
      "slot_frame": {
        "prefix_de": "Einen Tee, ",
        "suffix_de": ".",
        "target_slot_de": "bitte"
      },
      "stimulus_modality": "text",
      "response_modality": "typed",
      "support_level": "H3",
      "hint_types": [
        "partial_frame"
      ],
      "answer_revealing_exposure": false,
      "evidence_capability": "E2",
      "deterministic_rule": "SLOT_EQUALS_BITTE",
      "feedback_policy": {
        "success_feedback_reveals_target": false,
        "repair_feedback_reveals_target": true,
        "reveal_event_type": "AnswerRevealingExposureRecorded",
        "immediate_retry_contaminated": true,
        "clean_delay_clock_reset": true
      },
      "success_feedback_en": "Correct. The request now contains the required politeness marker.",
      "repair_feedback_en": "Type 'bitte' to finish the request.",
      "context_vector": {
        "intent_code": "SERVICE_REQUEST_ONE",
        "venue": "cafe",
        "referent_or_information_slot": "tea",
        "interlocutor": "clerk",
        "dialogue_position": "supported_slot",
        "prompt_surface": "slot_fill",
        "stimulus_modality": "text",
        "distractor_set": "none"
      },
      "changed_dimensions": [],
      "required_familiarity_items": [
        {
          "item_id": "LEX-DE-002",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        },
        {
          "item_id": "LEX-DE-004",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        },
        {
          "item_id": "LEX-DE-006",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        }
      ],
      "content_dependencies": [
        "LEX-DE-002",
        "LEX-DE-004",
        "LEX-DE-006"
      ],
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "activity_id": "ACT-DE-N1-E3-01",
      "node_id": "NODE-N1",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "evidence_lane": "typed_production",
      "learner_goal": "Independently order tea in a new bakery context without target German words in the prompt.",
      "ui_copy_en": "At the Bakery: The baker greets you: 'Guten Morgen! Was darf es sein?' Type your polite order in German for: 'A tea, please.'",
      "content_de": "Baker: 'Guten Morgen! Was darf es sein?'",
      "stimulus_modality": "text",
      "response_modality": "typed",
      "support_level": "H1",
      "hint_types": [
        "situational_goal_en"
      ],
      "answer_revealing_exposure": false,
      "evidence_capability": "E3",
      "evaluator_rule": {
        "rubric_id": "RUBRIC-DE-N1-REQ-01",
        "rubric_version": "2.1.0",
        "target_item_id": "LEX-DE-002",
        "allowed_variant_ids": [
          "VAR-DE-N1-08"
        ],
        "normalization_profile": "UNICODE_NFC_TRIM_COLLAPSE_WHITESPACE",
        "exact_target_item_required": true
      },
      "feedback_policy": {
        "success_feedback_reveals_target": false,
        "repair_feedback_reveals_target": true,
        "reveal_event_type": "AnswerRevealingExposureRecorded",
        "immediate_retry_contaminated": true,
        "clean_delay_clock_reset": true
      },
      "baseline_activity_id": "ACT-DE-N1-E2-01",
      "success_feedback_en": "You used this request phrase independently in a new typed bakery scenario.",
      "repair_feedback_en": "To order tea politely, type: 'Einen Tee, bitte.'",
      "context_vector": {
        "intent_code": "SERVICE_REQUEST_ONE",
        "venue": "bakery",
        "referent_or_information_slot": "tea",
        "interlocutor": "baker",
        "dialogue_position": "initial_order",
        "prompt_surface": "free_typed_simulation",
        "stimulus_modality": "text",
        "distractor_set": "none"
      },
      "changed_dimensions": [
        {
          "dimension": "venue",
          "from": "cafe",
          "to": "bakery",
          "relevance": "CONTEXTUAL"
        },
        {
          "dimension": "referent_or_information_slot",
          "from": "coffee",
          "to": "tea",
          "relevance": "SEMANTIC_RETRIEVAL"
        },
        {
          "dimension": "prompt_surface",
          "from": "token_bank",
          "to": "free_typed_simulation",
          "relevance": "SURFACE"
        }
      ],
      "required_familiarity_items": [
        {
          "item_id": "LEX-DE-002",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        },
        {
          "item_id": "LEX-DE-004",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        },
        {
          "item_id": "LEX-DE-006",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        }
      ],
      "content_dependencies": [
        "LEX-DE-002",
        "LEX-DE-004",
        "LEX-DE-006"
      ],
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "content_version": "2.1.0-candidate",
      "evidence_policy_version": "1.1"
    },
    {
      "activity_id": "ACT-DE-N1-E4-01",
      "node_id": "NODE-N1",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "evidence_lane": "typed_production",
      "learner_goal": "Recall and type a polite request for apple juice at a station kiosk after a clean delay.",
      "ui_copy_en": "Return Mission — Station Kiosk: The board lists 'Apfelsaft'. The clerk asks: 'Hallo! Was möchten Sie?' Type your order in German for: 'An apple juice, please.'",
      "content_de": "Clerk: 'Hallo! Was möchten Sie?' [Menu board visible: Apfelsaft]",
      "stimulus_modality": "text",
      "response_modality": "typed",
      "support_level": "H1",
      "hint_types": [
        "situational_goal_en"
      ],
      "answer_revealing_exposure": false,
      "evidence_capability": "E4",
      "evaluator_rule": {
        "rubric_id": "RUBRIC-DE-N1-REQ-01",
        "rubric_version": "2.1.0",
        "target_item_id": "LEX-DE-003",
        "allowed_variant_ids": [
          "VAR-DE-N1-09",
          "VAR-DE-N1-10",
          "VAR-DE-N1-11"
        ],
        "normalization_profile": "UNICODE_NFC_TRIM_COLLAPSE_WHITESPACE",
        "exact_target_item_required": true
      },
      "feedback_policy": {
        "success_feedback_reveals_target": false,
        "repair_feedback_reveals_target": true,
        "reveal_event_type": "AnswerRevealingExposureRecorded",
        "immediate_retry_contaminated": true,
        "clean_delay_clock_reset": true
      },
      "baseline_activity_id": "ACT-DE-N1-E3-01",
      "e4_eligibility_policy": {
        "prior_tier": "E3",
        "prior_same_skill": true,
        "prior_same_lane": true,
        "minimum_clean_delay_seconds": 72000,
        "scheduler_target_seconds": [
          86400,
          259200
        ],
        "clock_anchor": "MAX(PRIOR_E3_AT,LAST_ANSWER_REVEAL_AT)",
        "answer_reveal_resets_clock": true,
        "allowed_support_levels": [
          "H0",
          "H1"
        ],
        "changed_context_required": true,
        "rubric_compatibility_required": true,
        "content_familiarity_required": true
      },
      "success_feedback_en": "You produced this request phrase in a delayed typed return check.",
      "repair_feedback_en": "To order apple juice, type: 'Einen Apfelsaft, bitte.'",
      "context_vector": {
        "intent_code": "SERVICE_REQUEST_ONE",
        "venue": "station_kiosk",
        "referent_or_information_slot": "apple_juice",
        "interlocutor": "kiosk_clerk",
        "dialogue_position": "initial_order",
        "prompt_surface": "free_typed_simulation",
        "stimulus_modality": "text",
        "distractor_set": "none"
      },
      "changed_dimensions": [
        {
          "dimension": "venue",
          "from": "bakery",
          "to": "station_kiosk",
          "relevance": "CONTEXTUAL"
        },
        {
          "dimension": "referent_or_information_slot",
          "from": "tea",
          "to": "apple_juice",
          "relevance": "SEMANTIC_RETRIEVAL"
        },
        {
          "dimension": "interlocutor",
          "from": "baker",
          "to": "kiosk_clerk",
          "relevance": "CONTEXTUAL"
        }
      ],
      "required_familiarity_items": [
        {
          "item_id": "LEX-DE-003",
          "familiarity_basis": "VISIBLE_IN_NATURAL_CONTEXT",
          "visibility_source_path": "content_de"
        },
        {
          "item_id": "LEX-DE-004",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        },
        {
          "item_id": "LEX-DE-006",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        }
      ],
      "content_dependencies": [
        "LEX-DE-003",
        "LEX-DE-004",
        "LEX-DE-006"
      ],
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "content_version": "2.1.0-candidate",
      "evidence_policy_version": "1.1"
    },
    {
      "activity_id": "ACT-DE-N2-E0-01",
      "node_id": "NODE-N2",
      "skill_id": "GER-SVC-REPAIR-01",
      "evidence_lane": "read_recognition",
      "learner_goal": "Observe how to signal non-understanding and continue a transaction.",
      "ui_copy_en": "When Words Move Fast: Notice how 'Wie bitte?' signals that you need the speaker to repeat.",
      "content_de": "Clerk: 'Darf es sonst noch etwas sein?' / Customer: 'Wie bitte?' / Clerk: 'Möchten Sie noch etwas?' / Customer: 'Nein, danke.'",
      "stimulus_modality": "text",
      "response_modality": "selection",
      "support_level": "H4",
      "hint_types": [
        "model_dialogue"
      ],
      "answer_revealing_exposure": true,
      "evidence_capability": "E0",
      "deterministic_rule": "PASS_ON_CONTINUE",
      "feedback_policy": {
        "success_feedback_reveals_target": false,
        "repair_feedback_reveals_target": false,
        "reveal_event_type": "AnswerRevealingExposureRecorded",
        "immediate_retry_contaminated": true,
        "clean_delay_clock_reset": true
      },
      "success_feedback_en": "Study the communication-repair model and continue when you are ready.",
      "repair_feedback_en": "",
      "context_vector": {
        "intent_code": "COMMUNICATION_REPAIR",
        "venue": "cafe",
        "referent_or_information_slot": "clarification_request",
        "interlocutor": "clerk",
        "dialogue_position": "breakdown_repair",
        "prompt_surface": "model_card",
        "stimulus_modality": "text",
        "distractor_set": "none"
      },
      "changed_dimensions": [],
      "required_familiarity_items": [
        {
          "item_id": "LEX-DE-004",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        },
        {
          "item_id": "LEX-DE-005",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        },
        {
          "item_id": "LEX-DE-007",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        }
      ],
      "content_dependencies": [
        "LEX-DE-004",
        "LEX-DE-005",
        "LEX-DE-007"
      ],
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "activity_id": "ACT-DE-N2-E1-01",
      "node_id": "NODE-N2",
      "skill_id": "GER-SVC-REPAIR-01",
      "evidence_lane": "read_recognition",
      "learner_goal": "Identify 'Wie bitte?' as the standard phrase for 'Pardon?' in a café context.",
      "ui_copy_en": "The clerk speaks quickly and you miss it. Which phrase means 'Pardon?' or 'Could you repeat that?'?",
      "content_de": "A: Wie bitte? | B: Einen Tee, bitte. | C: Guten Tag. | D: Auf Wiedersehen.",
      "choices": [
        {
          "choice_id": "CHOICE-A",
          "text_de": "Wie bitte?",
          "is_correct": true
        },
        {
          "choice_id": "CHOICE-B",
          "text_de": "Einen Tee, bitte.",
          "is_correct": false
        },
        {
          "choice_id": "CHOICE-C",
          "text_de": "Guten Tag.",
          "is_correct": false
        },
        {
          "choice_id": "CHOICE-D",
          "text_de": "Auf Wiedersehen.",
          "is_correct": false
        }
      ],
      "stimulus_modality": "text",
      "response_modality": "selection",
      "support_level": "H1",
      "hint_types": [
        "situational_goal_en"
      ],
      "answer_revealing_exposure": false,
      "evidence_capability": "E1",
      "deterministic_rule": "EXACT_MATCH_CHOICE_A",
      "feedback_policy": {
        "success_feedback_reveals_target": false,
        "repair_feedback_reveals_target": true,
        "reveal_event_type": "AnswerRevealingExposureRecorded",
        "immediate_retry_contaminated": true,
        "clean_delay_clock_reset": true
      },
      "success_feedback_en": "Correct. That option signals non-understanding.",
      "repair_feedback_en": "Use 'Wie bitte?' when you need someone to repeat.",
      "context_vector": {
        "intent_code": "COMMUNICATION_REPAIR",
        "venue": "cafe",
        "referent_or_information_slot": "pardon_formula",
        "interlocutor": "clerk",
        "dialogue_position": "repair_selection",
        "prompt_surface": "four_choice_item",
        "stimulus_modality": "text",
        "distractor_set": "request_greeting_closing"
      },
      "changed_dimensions": [],
      "required_familiarity_items": [
        {
          "item_id": "LEX-DE-007",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        }
      ],
      "content_dependencies": [
        "LEX-DE-007"
      ],
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "activity_id": "ACT-DE-N2-E1-02",
      "node_id": "NODE-N2",
      "skill_id": "GER-SVC-REPAIR-01",
      "evidence_lane": "read_recognition",
      "learner_goal": "Identify 'Wie bitte?' as the repair phrase in a bakery context.",
      "ui_copy_en": "At the bakery, the baker speaks too fast. Which phrase signals 'Pardon?'?",
      "content_de": "A: Bitte schön. | B: Wie bitte? | C: Danke schön. | D: Einen Kaffee, bitte.",
      "choices": [
        {
          "choice_id": "CHOICE-A",
          "text_de": "Bitte schön.",
          "is_correct": false
        },
        {
          "choice_id": "CHOICE-B",
          "text_de": "Wie bitte?",
          "is_correct": true
        },
        {
          "choice_id": "CHOICE-C",
          "text_de": "Danke schön.",
          "is_correct": false
        },
        {
          "choice_id": "CHOICE-D",
          "text_de": "Einen Kaffee, bitte.",
          "is_correct": false
        }
      ],
      "stimulus_modality": "text",
      "response_modality": "selection",
      "support_level": "H1",
      "hint_types": [
        "situational_goal_en"
      ],
      "answer_revealing_exposure": false,
      "evidence_capability": "E1",
      "deterministic_rule": "EXACT_MATCH_CHOICE_B",
      "feedback_policy": {
        "success_feedback_reveals_target": false,
        "repair_feedback_reveals_target": true,
        "reveal_event_type": "AnswerRevealingExposureRecorded",
        "immediate_retry_contaminated": true,
        "clean_delay_clock_reset": true
      },
      "success_feedback_en": "Correct. That option fits the communication-breakdown situation.",
      "repair_feedback_en": "Choose 'Wie bitte?' to signal that you did not catch what was said.",
      "context_vector": {
        "intent_code": "COMMUNICATION_REPAIR",
        "venue": "bakery",
        "referent_or_information_slot": "pardon_formula",
        "interlocutor": "baker",
        "dialogue_position": "repair_selection",
        "prompt_surface": "four_choice_item",
        "stimulus_modality": "text",
        "distractor_set": "service_phrase_thanks_order"
      },
      "changed_dimensions": [],
      "required_familiarity_items": [
        {
          "item_id": "LEX-DE-007",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        }
      ],
      "content_dependencies": [
        "LEX-DE-007"
      ],
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "activity_id": "ACT-DE-N2-E1-03",
      "node_id": "NODE-N2",
      "skill_id": "GER-SVC-REPAIR-01",
      "evidence_lane": "read_recognition",
      "learner_goal": "Identify 'Wie bitte?' among refusal and closing distractors.",
      "ui_copy_en": "You didn't hear the clerk at the kiosk. Which phrase asks for clarification?",
      "content_de": "A: Nein, danke. | B: Kein Problem. | C: Wie bitte? | D: Auf Wiedersehen.",
      "choices": [
        {
          "choice_id": "CHOICE-A",
          "text_de": "Nein, danke.",
          "is_correct": false
        },
        {
          "choice_id": "CHOICE-B",
          "text_de": "Kein Problem.",
          "is_correct": false
        },
        {
          "choice_id": "CHOICE-C",
          "text_de": "Wie bitte?",
          "is_correct": true
        },
        {
          "choice_id": "CHOICE-D",
          "text_de": "Auf Wiedersehen.",
          "is_correct": false
        }
      ],
      "stimulus_modality": "text",
      "response_modality": "selection",
      "support_level": "H1",
      "hint_types": [
        "situational_goal_en"
      ],
      "answer_revealing_exposure": false,
      "evidence_capability": "E1",
      "deterministic_rule": "EXACT_MATCH_CHOICE_C",
      "feedback_policy": {
        "success_feedback_reveals_target": false,
        "repair_feedback_reveals_target": true,
        "reveal_event_type": "AnswerRevealingExposureRecorded",
        "immediate_retry_contaminated": true,
        "clean_delay_clock_reset": true
      },
      "success_feedback_en": "Correct. That option appropriately asks for clarification.",
      "repair_feedback_en": "Select 'Wie bitte?' when you need to hear something again.",
      "context_vector": {
        "intent_code": "COMMUNICATION_REPAIR",
        "venue": "station_kiosk",
        "referent_or_information_slot": "pardon_formula",
        "interlocutor": "kiosk_clerk",
        "dialogue_position": "repair_selection",
        "prompt_surface": "four_choice_item",
        "stimulus_modality": "text",
        "distractor_set": "refusal_idiom_closing"
      },
      "changed_dimensions": [],
      "required_familiarity_items": [
        {
          "item_id": "LEX-DE-007",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        }
      ],
      "content_dependencies": [
        "LEX-DE-007"
      ],
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "activity_id": "ACT-DE-N2-E2-01",
      "node_id": "NODE-N2",
      "skill_id": "GER-SVC-REPAIR-01",
      "evidence_lane": "typed_production",
      "learner_goal": "Assemble 'Wie bitte?' from word tiles.",
      "ui_copy_en": "Arrange the words to say: 'Pardon?'",
      "content_de": "Tokens: [bitte?] [Wie] [Danke] [Guten]",
      "tokens": [
        {
          "token_id": "TOK-N2-01",
          "text": "Wie"
        },
        {
          "token_id": "TOK-N2-02",
          "text": "bitte?"
        },
        {
          "token_id": "TOK-N2-03",
          "text": "Danke"
        },
        {
          "token_id": "TOK-N2-04",
          "text": "Guten"
        }
      ],
      "target_token_sequence": [
        "TOK-N2-01",
        "TOK-N2-02"
      ],
      "stimulus_modality": "text",
      "response_modality": "construction",
      "support_level": "H3",
      "hint_types": [
        "word_bank"
      ],
      "answer_revealing_exposure": false,
      "evidence_capability": "E2",
      "deterministic_rule": "TOKEN_ORDER_WIE_BITTE",
      "feedback_policy": {
        "success_feedback_reveals_target": false,
        "repair_feedback_reveals_target": true,
        "reveal_event_type": "AnswerRevealingExposureRecorded",
        "immediate_retry_contaminated": true,
        "clean_delay_clock_reset": true
      },
      "success_feedback_en": "Correct. The word sequence forms the intended repair expression.",
      "repair_feedback_en": "Combine 'Wie' + 'bitte?'.",
      "context_vector": {
        "intent_code": "COMMUNICATION_REPAIR",
        "venue": "cafe",
        "referent_or_information_slot": "pardon_formula",
        "interlocutor": "clerk",
        "dialogue_position": "supported_build",
        "prompt_surface": "token_bank",
        "stimulus_modality": "text",
        "distractor_set": "lexical_distractors"
      },
      "changed_dimensions": [],
      "required_familiarity_items": [
        {
          "item_id": "LEX-DE-004",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        },
        {
          "item_id": "LEX-DE-007",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        }
      ],
      "content_dependencies": [
        "LEX-DE-004",
        "LEX-DE-007"
      ],
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "activity_id": "ACT-DE-N2-E2-02",
      "node_id": "NODE-N2",
      "skill_id": "GER-SVC-REPAIR-01",
      "evidence_lane": "typed_production",
      "learner_goal": "Type the missing word in 'Wie ______?'.",
      "ui_copy_en": "Complete the phrase for 'Pardon?': 'Wie ______?'",
      "content_de": "Prompt: 'Wie ______?' / Target: 'bitte'",
      "slot_frame": {
        "prefix_de": "Wie ",
        "suffix_de": "?",
        "target_slot_de": "bitte"
      },
      "stimulus_modality": "text",
      "response_modality": "typed",
      "support_level": "H3",
      "hint_types": [
        "partial_frame"
      ],
      "answer_revealing_exposure": false,
      "evidence_capability": "E2",
      "deterministic_rule": "SLOT_EQUALS_BITTE",
      "feedback_policy": {
        "success_feedback_reveals_target": false,
        "repair_feedback_reveals_target": true,
        "reveal_event_type": "AnswerRevealingExposureRecorded",
        "immediate_retry_contaminated": true,
        "clean_delay_clock_reset": true
      },
      "success_feedback_en": "Correct. The repair expression is complete.",
      "repair_feedback_en": "Type 'bitte' to complete 'Wie bitte?'.",
      "context_vector": {
        "intent_code": "COMMUNICATION_REPAIR",
        "venue": "cafe",
        "referent_or_information_slot": "pardon_formula",
        "interlocutor": "clerk",
        "dialogue_position": "supported_slot",
        "prompt_surface": "slot_fill",
        "stimulus_modality": "text",
        "distractor_set": "none"
      },
      "changed_dimensions": [],
      "required_familiarity_items": [
        {
          "item_id": "LEX-DE-004",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        },
        {
          "item_id": "LEX-DE-007",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        }
      ],
      "content_dependencies": [
        "LEX-DE-004",
        "LEX-DE-007"
      ],
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "activity_id": "ACT-DE-N2-E3-01",
      "node_id": "NODE-N2",
      "skill_id": "GER-SVC-REPAIR-01",
      "evidence_lane": "typed_production",
      "learner_goal": "Independently type a German repair formula in a written juice stand simulation when the vendor's question is unclear.",
      "ui_copy_en": "At the Juice Stand: The vendor asks briskly: 'Darf es sonst noch etwas sein?' You didn't catch that. What do you say in German?",
      "content_de": "Vendor: 'Darf es sonst noch etwas sein?'",
      "stimulus_modality": "text",
      "response_modality": "typed",
      "support_level": "H1",
      "hint_types": [
        "situational_goal_en"
      ],
      "answer_revealing_exposure": false,
      "evidence_capability": "E3",
      "evaluator_rule": {
        "rubric_id": "RUBRIC-DE-N2-REP-01",
        "rubric_version": "2.1.0",
        "target_item_id": "LEX-DE-007",
        "allowed_variant_ids": [
          "VAR-DE-N2-01",
          "VAR-DE-N2-02",
          "VAR-DE-N2-03"
        ],
        "normalization_profile": "UNICODE_NFC_TRIM_COLLAPSE_WHITESPACE",
        "exact_target_item_required": true
      },
      "feedback_policy": {
        "success_feedback_reveals_target": false,
        "repair_feedback_reveals_target": true,
        "reveal_event_type": "AnswerRevealingExposureRecorded",
        "immediate_retry_contaminated": true,
        "clean_delay_clock_reset": true
      },
      "baseline_activity_id": "ACT-DE-N2-E2-01",
      "success_feedback_en": "You used this repair phrase in a new typed situation.",
      "repair_feedback_en": "When you miss something, you can type 'Wie bitte?'.",
      "context_vector": {
        "intent_code": "COMMUNICATION_REPAIR",
        "venue": "juice_stand",
        "referent_or_information_slot": "unclear_followup_question",
        "interlocutor": "juice_vendor",
        "dialogue_position": "breakdown_turn",
        "prompt_surface": "free_typed_simulation",
        "stimulus_modality": "text",
        "distractor_set": "none"
      },
      "changed_dimensions": [
        {
          "dimension": "venue",
          "from": "cafe",
          "to": "juice_stand",
          "relevance": "CONTEXTUAL"
        },
        {
          "dimension": "referent_or_information_slot",
          "from": "pardon_formula",
          "to": "unclear_followup_question",
          "relevance": "SEMANTIC_RETRIEVAL"
        },
        {
          "dimension": "interlocutor",
          "from": "clerk",
          "to": "juice_vendor",
          "relevance": "CONTEXTUAL"
        },
        {
          "dimension": "prompt_surface",
          "from": "token_bank",
          "to": "free_typed_simulation",
          "relevance": "SURFACE"
        }
      ],
      "required_familiarity_items": [
        {
          "item_id": "LEX-DE-004",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        },
        {
          "item_id": "LEX-DE-007",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        }
      ],
      "content_dependencies": [
        "LEX-DE-004",
        "LEX-DE-007"
      ],
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "content_version": "2.1.0-candidate",
      "evidence_policy_version": "1.1"
    },
    {
      "activity_id": "ACT-DE-N2-E4-01",
      "node_id": "NODE-N2",
      "skill_id": "GER-SVC-REPAIR-01",
      "evidence_lane": "typed_production",
      "learner_goal": "Recall and type a German repair formula in a delayed return check at a station kiosk.",
      "ui_copy_en": "Return Mission — Station Kiosk: The clerk asks briskly: 'Möchten Sie eine Quittung?' You missed what was said. What do you say in German?",
      "content_de": "Clerk: 'Möchten Sie eine Quittung?'",
      "stimulus_modality": "text",
      "response_modality": "typed",
      "support_level": "H1",
      "hint_types": [
        "situational_goal_en"
      ],
      "answer_revealing_exposure": false,
      "evidence_capability": "E4",
      "evaluator_rule": {
        "rubric_id": "RUBRIC-DE-N2-REP-01",
        "rubric_version": "2.1.0",
        "target_item_id": "LEX-DE-007",
        "allowed_variant_ids": [
          "VAR-DE-N2-01",
          "VAR-DE-N2-02",
          "VAR-DE-N2-03"
        ],
        "normalization_profile": "UNICODE_NFC_TRIM_COLLAPSE_WHITESPACE",
        "exact_target_item_required": true
      },
      "feedback_policy": {
        "success_feedback_reveals_target": false,
        "repair_feedback_reveals_target": true,
        "reveal_event_type": "AnswerRevealingExposureRecorded",
        "immediate_retry_contaminated": true,
        "clean_delay_clock_reset": true
      },
      "baseline_activity_id": "ACT-DE-N2-E3-01",
      "e4_eligibility_policy": {
        "prior_tier": "E3",
        "prior_same_skill": true,
        "prior_same_lane": true,
        "minimum_clean_delay_seconds": 72000,
        "scheduler_target_seconds": [
          86400,
          259200
        ],
        "clock_anchor": "MAX(PRIOR_E3_AT,LAST_ANSWER_REVEAL_AT)",
        "answer_reveal_resets_clock": true,
        "allowed_support_levels": [
          "H0",
          "H1"
        ],
        "changed_context_required": true,
        "rubric_compatibility_required": true,
        "content_familiarity_required": true
      },
      "success_feedback_en": "You used this repair phrase in a delayed typed return check.",
      "repair_feedback_en": "To ask for repetition, type 'Wie bitte?'.",
      "context_vector": {
        "intent_code": "COMMUNICATION_REPAIR",
        "venue": "station_kiosk",
        "referent_or_information_slot": "unclear_receipt_offer",
        "interlocutor": "kiosk_clerk",
        "dialogue_position": "breakdown_turn",
        "prompt_surface": "free_typed_simulation",
        "stimulus_modality": "text",
        "distractor_set": "none"
      },
      "changed_dimensions": [
        {
          "dimension": "venue",
          "from": "juice_stand",
          "to": "station_kiosk",
          "relevance": "CONTEXTUAL"
        },
        {
          "dimension": "referent_or_information_slot",
          "from": "followup_query",
          "to": "receipt_query",
          "relevance": "SEMANTIC_RETRIEVAL"
        },
        {
          "dimension": "interlocutor",
          "from": "juice_vendor",
          "to": "kiosk_clerk",
          "relevance": "CONTEXTUAL"
        }
      ],
      "required_familiarity_items": [
        {
          "item_id": "LEX-DE-004",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        },
        {
          "item_id": "LEX-DE-007",
          "familiarity_basis": "PRETAUGHT_ACCEPTED",
          "visibility_source_path": null
        }
      ],
      "content_dependencies": [
        "LEX-DE-004",
        "LEX-DE-007"
      ],
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "content_version": "2.1.0-candidate",
      "evidence_policy_version": "1.1"
    }
  ],
  "bundles": [
    {
      "bundle_id": "BND-DE-N1-E1",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "target_evidence_stage": "E1",
      "evidence_lane": "read_recognition",
      "required_successes": 3,
      "total_distinct_items": 3,
      "feedback_contaminated_items_count": false,
      "child_activity_ids": [
        "ACT-DE-N1-E1-01",
        "ACT-DE-N1-E1-02",
        "ACT-DE-N1-E1-03"
      ],
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "bundle_id": "BND-DE-N1-E2",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "target_evidence_stage": "E2",
      "evidence_lane": "typed_production",
      "required_successes": 2,
      "total_distinct_items": 2,
      "feedback_contaminated_items_count": false,
      "child_activity_ids": [
        "ACT-DE-N1-E2-01",
        "ACT-DE-N1-E2-02"
      ],
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "bundle_id": "BND-DE-N2-E1",
      "skill_id": "GER-SVC-REPAIR-01",
      "target_evidence_stage": "E1",
      "evidence_lane": "read_recognition",
      "required_successes": 3,
      "total_distinct_items": 3,
      "feedback_contaminated_items_count": false,
      "child_activity_ids": [
        "ACT-DE-N2-E1-01",
        "ACT-DE-N2-E1-02",
        "ACT-DE-N2-E1-03"
      ],
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "bundle_id": "BND-DE-N2-E2",
      "skill_id": "GER-SVC-REPAIR-01",
      "target_evidence_stage": "E2",
      "evidence_lane": "typed_production",
      "required_successes": 2,
      "total_distinct_items": 2,
      "feedback_contaminated_items_count": false,
      "child_activity_ids": [
        "ACT-DE-N2-E2-01",
        "ACT-DE-N2-E2-02"
      ],
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    }
  ],
  "evaluation_fixtures": [
    {
      "fixture_id": "ERR-F01",
      "description": "Negative configuration probe: a full model exposure incorrectly declared H0/E4 is reclassified to H4/E0.",
      "activity_id": "ACT-DE-N1-E0-01",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "Einen Kaffee, bitte.",
        "normalized_input": "Einen Kaffee, bitte.",
        "matched_variant_id": "VAR-DE-N1-01",
        "runtime_activity_context_present": true,
        "invalid_activity_declaration": {
          "activity_id": "ACT-DE-N1-E0-01",
          "content_de": "Customer: 'Einen Kaffee, bitte.'",
          "declared_support_level": "H0",
          "declared_answer_revealing_exposure": true,
          "declared_evidence_capability": "E4"
        },
        "classification_resolution": {
          "action": "RECLASSIFY",
          "derived_support_level": "H4",
          "derived_evidence_capability": "E0"
        }
      },
      "expected_attempt_evaluation": {
        "raw_input": "Einen Kaffee, bitte.",
        "normalized_input": "Einen Kaffee, bitte.",
        "matched_variant_id": "VAR-DE-N1-01",
        "evaluation_outcome": "accepted_clean",
        "intent_outcome": "achieved",
        "form_outcome": "acceptable",
        "register_outcome": "appropriate",
        "error_codes": [],
        "evaluator_confidence_bucket": "HIGH_DETERMINISTIC"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N1-E0-01",
        "skill_id": "GER-SVC-REQUEST-ONE-01",
        "evidence_lane": "read_recognition",
        "evidence_capability": "E0",
        "support_level": "H4",
        "answer_revealing_exposure": true,
        "contamination_status": "NONE",
        "changed_context_qualified": false,
        "delay_qualified": false,
        "version_compatibility": true,
        "familiarity_qualified": true,
        "reason_codes": [
          "MODEL_EXPOSURE_RECLASSIFIED_H4_E0"
        ],
        "awarded_tier": "E0",
        "source_event_ids": []
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F02",
      "description": "Negative configuration probe: an English semantic-goal prompt incorrectly declared H0 is reclassified to H1.",
      "activity_id": "ACT-DE-N1-E3-01",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "Einen Tee, bitte.",
        "normalized_input": "Einen Tee, bitte.",
        "matched_variant_id": "VAR-DE-N1-08",
        "runtime_activity_context_present": true,
        "invalid_activity_declaration": {
          "activity_id": "ACT-DE-N1-E3-01",
          "learner_prompt_en": "At the bakery, ask for a tea in German.",
          "german_target_visible_in_prompt": false,
          "declared_support_level": "H0",
          "declared_evidence_capability": "E3"
        },
        "classification_resolution": {
          "action": "RECLASSIFY",
          "derived_support_level": "H1",
          "derived_evidence_capability": "E3"
        }
      },
      "expected_attempt_evaluation": {
        "raw_input": "Einen Tee, bitte.",
        "normalized_input": "Einen Tee, bitte.",
        "matched_variant_id": "VAR-DE-N1-08",
        "evaluation_outcome": "accepted_clean",
        "intent_outcome": "achieved",
        "form_outcome": "acceptable",
        "register_outcome": "appropriate",
        "error_codes": [],
        "evaluator_confidence_bucket": "HIGH_DETERMINISTIC"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N1-E3-01",
        "skill_id": "GER-SVC-REQUEST-ONE-01",
        "evidence_lane": "typed_production",
        "evidence_capability": "E3",
        "support_level": "H1",
        "answer_revealing_exposure": false,
        "contamination_status": "NONE",
        "changed_context_qualified": true,
        "delay_qualified": false,
        "version_compatibility": true,
        "familiarity_qualified": true,
        "reason_codes": [
          "SEMANTIC_GOAL_PROMPT_RECLASSIFIED_H1"
        ],
        "awarded_tier": "E3",
        "source_event_ids": []
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F03",
      "description": "Word bank construction activity (H3) correctly caps evidence at E2.",
      "activity_id": "ACT-DE-N1-E2-01",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "ordered_token_ids": [
          "TOK-01",
          "TOK-02",
          "TOK-03"
        ],
        "raw_input": "Einen Kaffee, bitte.",
        "normalized_input": "Einen Kaffee, bitte.",
        "matched_variant_id": "VAR-DE-N1-01",
        "activity_support_level": "H3",
        "answer_revealed": false,
        "runtime_activity_context_present": true
      },
      "expected_attempt_evaluation": {
        "raw_input": "Einen Kaffee, bitte.",
        "normalized_input": "Einen Kaffee, bitte.",
        "matched_variant_id": "VAR-DE-N1-01",
        "evaluation_outcome": "accepted_clean",
        "intent_outcome": "achieved",
        "form_outcome": "acceptable",
        "register_outcome": "appropriate",
        "error_codes": [],
        "evaluator_confidence_bucket": "HIGH_DETERMINISTIC"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N1-E2-01",
        "skill_id": "GER-SVC-REQUEST-ONE-01",
        "evidence_lane": "typed_production",
        "evidence_capability": "E2",
        "support_level": "H3",
        "answer_revealing_exposure": false,
        "contamination_status": "NONE",
        "changed_context_qualified": false,
        "delay_qualified": false,
        "version_compatibility": true,
        "familiarity_qualified": true,
        "reason_codes": [
          "SUPPORTED_PRODUCTION_H3"
        ],
        "awarded_tier": "E2",
        "source_event_ids": []
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F04",
      "description": "Contaminated retry immediately after answer reveal grants E0/practice only.",
      "activity_id": "ACT-DE-N1-E2-01",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "Einen Kaffee, bitte.",
        "normalized_input": "Einen Kaffee, bitte.",
        "matched_variant_id": "VAR-DE-N1-01",
        "activity_support_level": "H4",
        "answer_revealed": true,
        "preceding_feedback_seen": "ANSWER_REVEALED",
        "runtime_activity_context_present": true
      },
      "expected_attempt_evaluation": {
        "raw_input": "Einen Kaffee, bitte.",
        "normalized_input": "Einen Kaffee, bitte.",
        "matched_variant_id": "VAR-DE-N1-01",
        "evaluation_outcome": "accepted_clean",
        "intent_outcome": "achieved",
        "form_outcome": "acceptable",
        "register_outcome": "appropriate",
        "error_codes": [],
        "evaluator_confidence_bucket": "HIGH_DETERMINISTIC"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N1-E2-01",
        "skill_id": "GER-SVC-REQUEST-ONE-01",
        "evidence_lane": "typed_production",
        "evidence_capability": "E2",
        "support_level": "H4",
        "answer_revealing_exposure": true,
        "contamination_status": "CONTAMINATED",
        "changed_context_qualified": false,
        "delay_qualified": false,
        "version_compatibility": true,
        "familiarity_qualified": true,
        "reason_codes": [
          "CONTAMINATED_RETRY_BLOCKED_FROM_E2"
        ],
        "awarded_tier": "E0",
        "source_event_ids": []
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F05",
      "description": "Valid German string submitted without activity context yields evidence award NONE.",
      "activity_id": null,
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "Einen Kaffee, bitte.",
        "normalized_input": "Einen Kaffee, bitte.",
        "matched_variant_id": "VAR-DE-N1-01",
        "runtime_activity_context_present": false
      },
      "expected_attempt_evaluation": {
        "raw_input": "Einen Kaffee, bitte.",
        "normalized_input": "Einen Kaffee, bitte.",
        "matched_variant_id": "VAR-DE-N1-01",
        "evaluation_outcome": "accepted_clean",
        "intent_outcome": "achieved",
        "form_outcome": "acceptable",
        "register_outcome": "appropriate",
        "error_codes": [],
        "evaluator_confidence_bucket": "HIGH_DETERMINISTIC"
      },
      "expected_evidence_decision": {
        "activity_id": null,
        "skill_id": "GER-SVC-REQUEST-ONE-01",
        "evidence_lane": "typed_production",
        "evidence_capability": "E0",
        "support_level": "H0",
        "answer_revealing_exposure": false,
        "contamination_status": "NONE",
        "changed_context_qualified": false,
        "delay_qualified": false,
        "version_compatibility": false,
        "familiarity_qualified": false,
        "reason_codes": [
          "MISSING_ACTIVITY_RUNTIME_CONTEXT"
        ],
        "awarded_tier": "NONE",
        "source_event_ids": []
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F06",
      "description": "N1 typed production with H1 support and two changed dimensions qualifies for E3.",
      "activity_id": "ACT-DE-N1-E3-01",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "Einen Tee, bitte.",
        "normalized_input": "Einen Tee, bitte.",
        "matched_variant_id": "VAR-DE-N1-08",
        "activity_support_level": "H1",
        "answer_revealed": false,
        "runtime_activity_context_present": true
      },
      "expected_attempt_evaluation": {
        "raw_input": "Einen Tee, bitte.",
        "normalized_input": "Einen Tee, bitte.",
        "matched_variant_id": "VAR-DE-N1-08",
        "evaluation_outcome": "accepted_clean",
        "intent_outcome": "achieved",
        "form_outcome": "acceptable",
        "register_outcome": "appropriate",
        "error_codes": [],
        "evaluator_confidence_bucket": "HIGH_DETERMINISTIC"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N1-E3-01",
        "skill_id": "GER-SVC-REQUEST-ONE-01",
        "evidence_lane": "typed_production",
        "evidence_capability": "E3",
        "support_level": "H1",
        "answer_revealing_exposure": false,
        "contamination_status": "NONE",
        "changed_context_qualified": true,
        "delay_qualified": false,
        "version_compatibility": true,
        "familiarity_qualified": true,
        "reason_codes": [
          "INDEPENDENT_TRANSFER_QUALIFIED"
        ],
        "awarded_tier": "E3",
        "source_event_ids": []
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F07",
      "description": "Target-bearing lexical cue in prompt prevents E3 independent award.",
      "activity_id": "ACT-DE-N1-E3-01",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "Einen Tee, bitte.",
        "normalized_input": "Einen Tee, bitte.",
        "matched_variant_id": "VAR-DE-N1-08",
        "prompt_override_cue": "Hint: Use 'Einen Tee'",
        "effective_support_level": "H2",
        "runtime_activity_context_present": true
      },
      "expected_attempt_evaluation": {
        "raw_input": "Einen Tee, bitte.",
        "normalized_input": "Einen Tee, bitte.",
        "matched_variant_id": "VAR-DE-N1-08",
        "evaluation_outcome": "accepted_clean",
        "intent_outcome": "achieved",
        "form_outcome": "acceptable",
        "register_outcome": "appropriate",
        "error_codes": [],
        "evaluator_confidence_bucket": "HIGH_DETERMINISTIC"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N1-E3-01",
        "skill_id": "GER-SVC-REQUEST-ONE-01",
        "evidence_lane": "typed_production",
        "evidence_capability": "E3",
        "support_level": "H2",
        "answer_revealing_exposure": false,
        "contamination_status": "NONE",
        "changed_context_qualified": true,
        "delay_qualified": false,
        "version_compatibility": true,
        "familiarity_qualified": true,
        "reason_codes": [
          "TARGET_BEARING_CUE_CAPS_AT_E2"
        ],
        "awarded_tier": "E2",
        "source_event_ids": []
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F08",
      "description": "N2 typed simulation awards typed_production evidence only; listening/spoken lanes unchanged.",
      "activity_id": "ACT-DE-N2-E3-01",
      "skill_id": "GER-SVC-REPAIR-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "Wie bitte?",
        "normalized_input": "Wie bitte?",
        "matched_variant_id": "VAR-DE-N2-01",
        "activity_support_level": "H1",
        "runtime_activity_context_present": true
      },
      "expected_attempt_evaluation": {
        "raw_input": "Wie bitte?",
        "normalized_input": "Wie bitte?",
        "matched_variant_id": "VAR-DE-N2-01",
        "evaluation_outcome": "accepted_clean",
        "intent_outcome": "achieved",
        "form_outcome": "acceptable",
        "register_outcome": "appropriate",
        "error_codes": [],
        "evaluator_confidence_bucket": "HIGH_DETERMINISTIC"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N2-E3-01",
        "skill_id": "GER-SVC-REPAIR-01",
        "evidence_lane": "typed_production",
        "evidence_capability": "E3",
        "support_level": "H1",
        "answer_revealing_exposure": false,
        "contamination_status": "NONE",
        "changed_context_qualified": true,
        "delay_qualified": false,
        "version_compatibility": true,
        "familiarity_qualified": true,
        "reason_codes": [
          "TYPED_REPAIR_SIMULATION_QUALIFIED_E3"
        ],
        "awarded_tier": "E3",
        "source_event_ids": []
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F09",
      "description": "Explicit strategy instruction in prompt ('ask them to repeat') blocks self-initiated repair E3.",
      "activity_id": "ACT-DE-N2-E3-01",
      "skill_id": "GER-SVC-REPAIR-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "Wie bitte?",
        "normalized_input": "Wie bitte?",
        "matched_variant_id": "VAR-DE-N2-01",
        "prompt_override_cue": "Explicit prompt: Ask the clerk to repeat.",
        "effective_support_level": "H2",
        "runtime_activity_context_present": true
      },
      "expected_attempt_evaluation": {
        "raw_input": "Wie bitte?",
        "normalized_input": "Wie bitte?",
        "matched_variant_id": "VAR-DE-N2-01",
        "evaluation_outcome": "accepted_clean",
        "intent_outcome": "achieved",
        "form_outcome": "acceptable",
        "register_outcome": "appropriate",
        "error_codes": [],
        "evaluator_confidence_bucket": "HIGH_DETERMINISTIC"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N2-E3-01",
        "skill_id": "GER-SVC-REPAIR-01",
        "evidence_lane": "typed_production",
        "evidence_capability": "E3",
        "support_level": "H2",
        "answer_revealing_exposure": false,
        "contamination_status": "NONE",
        "changed_context_qualified": true,
        "delay_qualified": false,
        "version_compatibility": true,
        "familiarity_qualified": true,
        "reason_codes": [
          "EXPLICIT_STRATEGY_INSTRUCTION_CAPS_AT_E2"
        ],
        "awarded_tier": "E2",
        "source_event_ids": []
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F10",
      "description": "Valid 26-hour clean delay return in same lane qualifies for E4.",
      "activity_id": "ACT-DE-N1-E4-01",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "Einen Apfelsaft, bitte.",
        "normalized_input": "Einen Apfelsaft, bitte.",
        "matched_variant_id": "VAR-DE-N1-09",
        "seconds_since_prior_e3": 93600,
        "seconds_since_last_answer_reveal": null,
        "prior_e3_event_id": "EVT-ERR-F10-PRIOR-E3",
        "prior_e3_skill_id": "GER-SVC-REQUEST-ONE-01",
        "prior_e3_lane": "typed_production",
        "runtime_activity_context_present": true,
        "attempt_event_id": "EVT-ERR-F10-CURRENT-ATTEMPT",
        "attempt_at": "2026-09-02T12:00:00Z",
        "current_activity_id": "ACT-DE-N1-E4-01",
        "current_skill_id": "GER-SVC-REQUEST-ONE-01",
        "current_evidence_lane": "typed_production",
        "current_versions": {
          "content_version": "2.1.0-candidate",
          "evidence_policy_version": "1.1",
          "rubric_id": "RUBRIC-DE-N1-REQ-01",
          "rubric_version": "2.1.0"
        },
        "prior_e3_event": {
          "event_id": "EVT-ERR-F10-PRIOR-E3",
          "activity_id": "ACT-DE-N1-E3-01",
          "skill_id": "GER-SVC-REQUEST-ONE-01",
          "evidence_lane": "typed_production",
          "awarded_tier": "E3",
          "occurred_at": "2026-09-01T10:00:00.000Z",
          "versions": {
            "content_version": "2.1.0-candidate",
            "evidence_policy_version": "1.1",
            "rubric_id": "RUBRIC-DE-N1-REQ-01",
            "rubric_version": "2.1.0"
          }
        },
        "last_answer_revealing_exposure_event": null,
        "context_change_evidence": {
          "baseline_activity_id": "ACT-DE-N1-E3-01",
          "baseline_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "bakery",
            "referent_or_information_slot": "tea",
            "interlocutor": "baker",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "current_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "station_kiosk",
            "referent_or_information_slot": "apple_juice",
            "interlocutor": "kiosk_clerk",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "qualified_changed_dimensions": [
            {
              "dimension": "venue",
              "from": "bakery",
              "to": "station_kiosk",
              "relevance": "CONTEXTUAL"
            },
            {
              "dimension": "referent_or_information_slot",
              "from": "tea",
              "to": "apple_juice",
              "relevance": "SEMANTIC_RETRIEVAL"
            },
            {
              "dimension": "interlocutor",
              "from": "baker",
              "to": "kiosk_clerk",
              "relevance": "CONTEXTUAL"
            }
          ]
        },
        "familiarity_evidence": [
          {
            "item_id": "LEX-DE-003",
            "status": "VISIBLE_IN_NATURAL_CONTEXT",
            "source_type": "CURRENT_ACTIVITY_VISIBLE_CONTENT",
            "source_path": "/activities/7/content_de",
            "source_event_id": null
          },
          {
            "item_id": "LEX-DE-004",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-004"
          },
          {
            "item_id": "LEX-DE-006",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-006"
          }
        ],
        "rubric_version_used": "2.1.0"
      },
      "expected_attempt_evaluation": {
        "raw_input": "Einen Apfelsaft, bitte.",
        "normalized_input": "Einen Apfelsaft, bitte.",
        "matched_variant_id": "VAR-DE-N1-09",
        "evaluation_outcome": "accepted_clean",
        "intent_outcome": "achieved",
        "form_outcome": "acceptable",
        "register_outcome": "appropriate",
        "error_codes": [],
        "evaluator_confidence_bucket": "HIGH_DETERMINISTIC"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N1-E4-01",
        "skill_id": "GER-SVC-REQUEST-ONE-01",
        "evidence_lane": "typed_production",
        "evidence_capability": "E4",
        "support_level": "H1",
        "answer_revealing_exposure": false,
        "contamination_status": "NONE",
        "changed_context_qualified": true,
        "delay_qualified": true,
        "version_compatibility": true,
        "familiarity_qualified": true,
        "reason_codes": [
          "DELAYED_RETURN_E4_QUALIFIED"
        ],
        "awarded_tier": "E4",
        "source_event_ids": [
          "EVT-ERR-F10-PRIOR-E3",
          "EVT-FAMILIAR-LEX-DE-004",
          "EVT-FAMILIAR-LEX-DE-006"
        ]
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F11",
      "description": "Return check after only 3 hours clean delay cannot grant E4 (capped at E3 maintenance).",
      "activity_id": "ACT-DE-N1-E4-01",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "Einen Apfelsaft, bitte.",
        "normalized_input": "Einen Apfelsaft, bitte.",
        "matched_variant_id": "VAR-DE-N1-09",
        "seconds_since_prior_e3": 10800,
        "seconds_since_last_answer_reveal": null,
        "prior_e3_event_id": "EVT-ERR-F11-PRIOR-E3",
        "runtime_activity_context_present": true,
        "attempt_event_id": "EVT-ERR-F11-CURRENT-ATTEMPT",
        "attempt_at": "2026-09-02T12:00:00Z",
        "current_activity_id": "ACT-DE-N1-E4-01",
        "current_skill_id": "GER-SVC-REQUEST-ONE-01",
        "current_evidence_lane": "typed_production",
        "current_versions": {
          "content_version": "2.1.0-candidate",
          "evidence_policy_version": "1.1",
          "rubric_id": "RUBRIC-DE-N1-REQ-01",
          "rubric_version": "2.1.0"
        },
        "prior_e3_event": {
          "event_id": "EVT-ERR-F11-PRIOR-E3",
          "activity_id": "ACT-DE-N1-E3-01",
          "skill_id": "GER-SVC-REQUEST-ONE-01",
          "evidence_lane": "typed_production",
          "awarded_tier": "E3",
          "occurred_at": "2026-09-02T09:00:00.000Z",
          "versions": {
            "content_version": "2.1.0-candidate",
            "evidence_policy_version": "1.1",
            "rubric_id": "RUBRIC-DE-N1-REQ-01",
            "rubric_version": "2.1.0"
          }
        },
        "last_answer_revealing_exposure_event": null,
        "context_change_evidence": {
          "baseline_activity_id": "ACT-DE-N1-E3-01",
          "baseline_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "bakery",
            "referent_or_information_slot": "tea",
            "interlocutor": "baker",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "current_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "station_kiosk",
            "referent_or_information_slot": "apple_juice",
            "interlocutor": "kiosk_clerk",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "qualified_changed_dimensions": [
            {
              "dimension": "venue",
              "from": "bakery",
              "to": "station_kiosk",
              "relevance": "CONTEXTUAL"
            },
            {
              "dimension": "referent_or_information_slot",
              "from": "tea",
              "to": "apple_juice",
              "relevance": "SEMANTIC_RETRIEVAL"
            },
            {
              "dimension": "interlocutor",
              "from": "baker",
              "to": "kiosk_clerk",
              "relevance": "CONTEXTUAL"
            }
          ]
        },
        "familiarity_evidence": [
          {
            "item_id": "LEX-DE-003",
            "status": "VISIBLE_IN_NATURAL_CONTEXT",
            "source_type": "CURRENT_ACTIVITY_VISIBLE_CONTENT",
            "source_path": "/activities/7/content_de",
            "source_event_id": null
          },
          {
            "item_id": "LEX-DE-004",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-004"
          },
          {
            "item_id": "LEX-DE-006",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-006"
          }
        ],
        "prior_e3_skill_id": "GER-SVC-REQUEST-ONE-01",
        "prior_e3_lane": "typed_production",
        "rubric_version_used": "2.1.0"
      },
      "expected_attempt_evaluation": {
        "raw_input": "Einen Apfelsaft, bitte.",
        "normalized_input": "Einen Apfelsaft, bitte.",
        "matched_variant_id": "VAR-DE-N1-09",
        "evaluation_outcome": "accepted_clean",
        "intent_outcome": "achieved",
        "form_outcome": "acceptable",
        "register_outcome": "appropriate",
        "error_codes": [],
        "evaluator_confidence_bucket": "HIGH_DETERMINISTIC"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N1-E4-01",
        "skill_id": "GER-SVC-REQUEST-ONE-01",
        "evidence_lane": "typed_production",
        "evidence_capability": "E4",
        "support_level": "H1",
        "answer_revealing_exposure": false,
        "contamination_status": "NONE",
        "changed_context_qualified": true,
        "delay_qualified": false,
        "version_compatibility": true,
        "familiarity_qualified": true,
        "reason_codes": [
          "DELAY_THRESHOLD_NOT_MET"
        ],
        "awarded_tier": "E3",
        "source_event_ids": [
          "EVT-ERR-F11-PRIOR-E3",
          "EVT-FAMILIAR-LEX-DE-004",
          "EVT-FAMILIAR-LEX-DE-006"
        ]
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F12",
      "description": "Answer reveal 15 minutes before return attempt resets clean-delay clock and blocks E4.",
      "activity_id": "ACT-DE-N1-E4-01",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "Einen Apfelsaft, bitte.",
        "normalized_input": "Einen Apfelsaft, bitte.",
        "matched_variant_id": "VAR-DE-N1-09",
        "seconds_since_prior_e3": 93600,
        "seconds_since_last_answer_reveal": 900,
        "prior_e3_event_id": "EVT-ERR-F12-PRIOR-E3",
        "runtime_activity_context_present": true,
        "attempt_event_id": "EVT-ERR-F12-CURRENT-ATTEMPT",
        "attempt_at": "2026-09-02T12:00:00Z",
        "current_activity_id": "ACT-DE-N1-E4-01",
        "current_skill_id": "GER-SVC-REQUEST-ONE-01",
        "current_evidence_lane": "typed_production",
        "current_versions": {
          "content_version": "2.1.0-candidate",
          "evidence_policy_version": "1.1",
          "rubric_id": "RUBRIC-DE-N1-REQ-01",
          "rubric_version": "2.1.0"
        },
        "prior_e3_event": {
          "event_id": "EVT-ERR-F12-PRIOR-E3",
          "activity_id": "ACT-DE-N1-E3-01",
          "skill_id": "GER-SVC-REQUEST-ONE-01",
          "evidence_lane": "typed_production",
          "awarded_tier": "E3",
          "occurred_at": "2026-09-01T10:00:00.000Z",
          "versions": {
            "content_version": "2.1.0-candidate",
            "evidence_policy_version": "1.1",
            "rubric_id": "RUBRIC-DE-N1-REQ-01",
            "rubric_version": "2.1.0"
          }
        },
        "last_answer_revealing_exposure_event": {
          "event_id": "EVT-ERR-F12-ANSWER-REVEAL",
          "event_type": "AnswerRevealingExposureRecorded",
          "skill_id": "GER-SVC-REQUEST-ONE-01",
          "occurred_at": "2026-09-02T11:45:00.000Z"
        },
        "context_change_evidence": {
          "baseline_activity_id": "ACT-DE-N1-E3-01",
          "baseline_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "bakery",
            "referent_or_information_slot": "tea",
            "interlocutor": "baker",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "current_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "station_kiosk",
            "referent_or_information_slot": "apple_juice",
            "interlocutor": "kiosk_clerk",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "qualified_changed_dimensions": [
            {
              "dimension": "venue",
              "from": "bakery",
              "to": "station_kiosk",
              "relevance": "CONTEXTUAL"
            },
            {
              "dimension": "referent_or_information_slot",
              "from": "tea",
              "to": "apple_juice",
              "relevance": "SEMANTIC_RETRIEVAL"
            },
            {
              "dimension": "interlocutor",
              "from": "baker",
              "to": "kiosk_clerk",
              "relevance": "CONTEXTUAL"
            }
          ]
        },
        "familiarity_evidence": [
          {
            "item_id": "LEX-DE-003",
            "status": "VISIBLE_IN_NATURAL_CONTEXT",
            "source_type": "CURRENT_ACTIVITY_VISIBLE_CONTENT",
            "source_path": "/activities/7/content_de",
            "source_event_id": null
          },
          {
            "item_id": "LEX-DE-004",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-004"
          },
          {
            "item_id": "LEX-DE-006",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-006"
          }
        ],
        "prior_e3_skill_id": "GER-SVC-REQUEST-ONE-01",
        "prior_e3_lane": "typed_production",
        "rubric_version_used": "2.1.0"
      },
      "expected_attempt_evaluation": {
        "raw_input": "Einen Apfelsaft, bitte.",
        "normalized_input": "Einen Apfelsaft, bitte.",
        "matched_variant_id": "VAR-DE-N1-09",
        "evaluation_outcome": "accepted_clean",
        "intent_outcome": "achieved",
        "form_outcome": "acceptable",
        "register_outcome": "appropriate",
        "error_codes": [],
        "evaluator_confidence_bucket": "HIGH_DETERMINISTIC"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N1-E4-01",
        "skill_id": "GER-SVC-REQUEST-ONE-01",
        "evidence_lane": "typed_production",
        "evidence_capability": "E4",
        "support_level": "H1",
        "answer_revealing_exposure": false,
        "contamination_status": "NONE",
        "changed_context_qualified": true,
        "delay_qualified": false,
        "version_compatibility": true,
        "familiarity_qualified": true,
        "reason_codes": [
          "DELAY_RESET_BY_EXPOSURE"
        ],
        "awarded_tier": "E3",
        "source_event_ids": [
          "EVT-ERR-F12-PRIOR-E3",
          "EVT-ERR-F12-ANSWER-REVEAL",
          "EVT-FAMILIAR-LEX-DE-004",
          "EVT-FAMILIAR-LEX-DE-006"
        ]
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F13",
      "description": "Prior typed E3 does not satisfy spoken return check (unsupported evaluator in lane).",
      "activity_id": "ACT-DE-N1-E4-01",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "Einen Apfelsaft, bitte.",
        "normalized_input": "Einen Apfelsaft, bitte.",
        "matched_variant_id": "VAR-DE-N1-09",
        "response_modality_attempted": "spoken",
        "prior_e3_lane": "typed_production",
        "runtime_activity_context_present": true,
        "attempt_event_id": "EVT-ERR-F13-CURRENT-ATTEMPT",
        "attempt_at": "2026-09-02T12:00:00Z",
        "current_activity_id": "ACT-DE-N1-E4-01",
        "current_skill_id": "GER-SVC-REQUEST-ONE-01",
        "current_evidence_lane": "spoken_production",
        "current_versions": {
          "content_version": "2.1.0-candidate",
          "evidence_policy_version": "1.1",
          "rubric_id": "RUBRIC-DE-N1-REQ-01",
          "rubric_version": "2.1.0"
        },
        "prior_e3_event": {
          "event_id": "EVT-ERR-F13-PRIOR-E3",
          "activity_id": "ACT-DE-N1-E3-01",
          "skill_id": "GER-SVC-REQUEST-ONE-01",
          "evidence_lane": "typed_production",
          "awarded_tier": "E3",
          "occurred_at": "2026-09-01T10:00:00.000Z",
          "versions": {
            "content_version": "2.1.0-candidate",
            "evidence_policy_version": "1.1",
            "rubric_id": "RUBRIC-DE-N1-REQ-01",
            "rubric_version": "2.1.0"
          }
        },
        "last_answer_revealing_exposure_event": null,
        "context_change_evidence": {
          "baseline_activity_id": "ACT-DE-N1-E3-01",
          "baseline_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "bakery",
            "referent_or_information_slot": "tea",
            "interlocutor": "baker",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "current_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "station_kiosk",
            "referent_or_information_slot": "apple_juice",
            "interlocutor": "kiosk_clerk",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "qualified_changed_dimensions": [
            {
              "dimension": "venue",
              "from": "bakery",
              "to": "station_kiosk",
              "relevance": "CONTEXTUAL"
            },
            {
              "dimension": "referent_or_information_slot",
              "from": "tea",
              "to": "apple_juice",
              "relevance": "SEMANTIC_RETRIEVAL"
            },
            {
              "dimension": "interlocutor",
              "from": "baker",
              "to": "kiosk_clerk",
              "relevance": "CONTEXTUAL"
            }
          ]
        },
        "familiarity_evidence": [
          {
            "item_id": "LEX-DE-003",
            "status": "VISIBLE_IN_NATURAL_CONTEXT",
            "source_type": "CURRENT_ACTIVITY_VISIBLE_CONTENT",
            "source_path": "/activities/7/content_de",
            "source_event_id": null
          },
          {
            "item_id": "LEX-DE-004",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-004"
          },
          {
            "item_id": "LEX-DE-006",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-006"
          }
        ],
        "seconds_since_prior_e3": 93600,
        "seconds_since_last_answer_reveal": null,
        "prior_e3_event_id": "EVT-ERR-F13-PRIOR-E3",
        "prior_e3_skill_id": "GER-SVC-REQUEST-ONE-01",
        "rubric_version_used": "2.1.0"
      },
      "expected_attempt_evaluation": {
        "raw_input": "Einen Apfelsaft, bitte.",
        "normalized_input": "Einen Apfelsaft, bitte.",
        "matched_variant_id": "VAR-DE-N1-09",
        "evaluation_outcome": "unscored",
        "intent_outcome": "uncertain",
        "form_outcome": "uncertain",
        "register_outcome": "uncertain",
        "error_codes": [],
        "evaluator_confidence_bucket": "UNSUPPORTED_EVALUATOR"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N1-E4-01",
        "skill_id": "GER-SVC-REQUEST-ONE-01",
        "evidence_lane": "spoken_production",
        "evidence_capability": "E4",
        "support_level": "H1",
        "answer_revealing_exposure": false,
        "contamination_status": "NONE",
        "changed_context_qualified": true,
        "delay_qualified": true,
        "version_compatibility": true,
        "familiarity_qualified": true,
        "reason_codes": [
          "UNSUPPORTED_EVALUATOR_IN_SPOKEN_LANE"
        ],
        "awarded_tier": "NONE",
        "source_event_ids": [
          "EVT-ERR-F13-PRIOR-E3",
          "EVT-FAMILIAR-LEX-DE-004",
          "EVT-FAMILIAR-LEX-DE-006"
        ]
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F14",
      "description": "Counting delay as a context dimension fails changed-context validation.",
      "activity_id": "ACT-DE-N1-E3-01",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "Einen Kaffee, bitte.",
        "normalized_input": "Einen Kaffee, bitte.",
        "matched_variant_id": "VAR-DE-N1-01",
        "changed_dimensions_claimed": [
          "delay_over_20_hours",
          "venue_cafe_to_bakery"
        ],
        "runtime_activity_context_present": true
      },
      "expected_attempt_evaluation": {
        "raw_input": "Einen Kaffee, bitte.",
        "normalized_input": "Einen Kaffee, bitte.",
        "matched_variant_id": "VAR-DE-N1-01",
        "evaluation_outcome": "accepted_clean",
        "intent_outcome": "achieved",
        "form_outcome": "acceptable",
        "register_outcome": "appropriate",
        "error_codes": [],
        "evaluator_confidence_bucket": "HIGH_DETERMINISTIC"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N1-E3-01",
        "skill_id": "GER-SVC-REQUEST-ONE-01",
        "evidence_lane": "typed_production",
        "evidence_capability": "E3",
        "support_level": "H1",
        "answer_revealing_exposure": false,
        "contamination_status": "NONE",
        "changed_context_qualified": false,
        "delay_qualified": false,
        "version_compatibility": true,
        "familiarity_qualified": true,
        "reason_codes": [
          "INVALID_CHANGED_DIMENSIONS_DELAY_IS_NOT_CONTEXT"
        ],
        "awarded_tier": "E2",
        "source_event_ids": []
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F15",
      "description": "Completely new untaught noun in E4 produces unscored prerequisite missing, not learner failure.",
      "activity_id": "ACT-DE-N1-E4-01",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "Einen Rhabarbersaft, bitte.",
        "normalized_input": "Einen Rhabarbersaft, bitte.",
        "matched_variant_id": null,
        "item_familiarity": "UNTAUGHT_NO_RECORD",
        "runtime_activity_context_present": true,
        "attempt_event_id": "EVT-ERR-F15-CURRENT-ATTEMPT",
        "attempt_at": "2026-09-02T12:00:00Z",
        "current_activity_id": "ACT-DE-N1-E4-01",
        "current_skill_id": "GER-SVC-REQUEST-ONE-01",
        "current_evidence_lane": "typed_production",
        "current_versions": {
          "content_version": "2.1.0-candidate",
          "evidence_policy_version": "1.1",
          "rubric_id": "RUBRIC-DE-N1-REQ-01",
          "rubric_version": "2.1.0"
        },
        "prior_e3_event": {
          "event_id": "EVT-ERR-F15-PRIOR-E3",
          "activity_id": "ACT-DE-N1-E3-01",
          "skill_id": "GER-SVC-REQUEST-ONE-01",
          "evidence_lane": "typed_production",
          "awarded_tier": "E3",
          "occurred_at": "2026-09-01T10:00:00.000Z",
          "versions": {
            "content_version": "2.1.0-candidate",
            "evidence_policy_version": "1.1",
            "rubric_id": "RUBRIC-DE-N1-REQ-01",
            "rubric_version": "2.1.0"
          }
        },
        "last_answer_revealing_exposure_event": null,
        "context_change_evidence": {
          "baseline_activity_id": "ACT-DE-N1-E3-01",
          "baseline_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "bakery",
            "referent_or_information_slot": "tea",
            "interlocutor": "baker",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "current_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "station_kiosk",
            "referent_or_information_slot": "apple_juice",
            "interlocutor": "kiosk_clerk",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "qualified_changed_dimensions": [
            {
              "dimension": "venue",
              "from": "bakery",
              "to": "station_kiosk",
              "relevance": "CONTEXTUAL"
            },
            {
              "dimension": "referent_or_information_slot",
              "from": "tea",
              "to": "apple_juice",
              "relevance": "SEMANTIC_RETRIEVAL"
            },
            {
              "dimension": "interlocutor",
              "from": "baker",
              "to": "kiosk_clerk",
              "relevance": "CONTEXTUAL"
            }
          ]
        },
        "familiarity_evidence": [
          {
            "item_id": "LEX-DE-004",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-004"
          },
          {
            "item_id": "LEX-DE-006",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-006"
          }
        ],
        "seconds_since_prior_e3": 93600,
        "seconds_since_last_answer_reveal": null,
        "prior_e3_event_id": "EVT-ERR-F15-PRIOR-E3",
        "prior_e3_skill_id": "GER-SVC-REQUEST-ONE-01",
        "prior_e3_lane": "typed_production",
        "rubric_version_used": "2.1.0"
      },
      "expected_attempt_evaluation": {
        "raw_input": "Einen Rhabarbersaft, bitte.",
        "normalized_input": "Einen Rhabarbersaft, bitte.",
        "matched_variant_id": null,
        "evaluation_outcome": "unscored",
        "intent_outcome": "uncertain",
        "form_outcome": "uncertain",
        "register_outcome": "uncertain",
        "error_codes": [],
        "evaluator_confidence_bucket": "REVIEW_REQUIRED"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N1-E4-01",
        "skill_id": "GER-SVC-REQUEST-ONE-01",
        "evidence_lane": "typed_production",
        "evidence_capability": "E4",
        "support_level": "H1",
        "answer_revealing_exposure": false,
        "contamination_status": "NONE",
        "changed_context_qualified": true,
        "delay_qualified": true,
        "version_compatibility": true,
        "familiarity_qualified": false,
        "reason_codes": [
          "UNSCORED_PREREQUISITE_MISSING"
        ],
        "awarded_tier": "NONE",
        "source_event_ids": [
          "EVT-ERR-F15-PRIOR-E3",
          "EVT-FAMILIAR-LEX-DE-004",
          "EVT-FAMILIAR-LEX-DE-006"
        ]
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F16",
      "description": "'Ich will einen Kaffee.' is grammatically well-formed and semantically clear but deterministically rejected for the declared polite Sie service register.",
      "activity_id": "ACT-DE-N1-E3-01",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "Ich will einen Kaffee.",
        "normalized_input": "Ich will einen Kaffee.",
        "matched_variant_id": "NONCAN-DE-N1-02",
        "runtime_activity_context_present": true
      },
      "expected_attempt_evaluation": {
        "raw_input": "Ich will einen Kaffee.",
        "normalized_input": "Ich will einen Kaffee.",
        "matched_variant_id": "NONCAN-DE-N1-02",
        "evaluation_outcome": "failed_critical",
        "intent_outcome": "achieved",
        "form_outcome": "acceptable",
        "register_outcome": "mismatch",
        "error_codes": [
          "REGISTER_TOO_DIRECT"
        ],
        "evaluator_confidence_bucket": "HIGH_DETERMINISTIC"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N1-E3-01",
        "skill_id": "GER-SVC-REQUEST-ONE-01",
        "evidence_lane": "typed_production",
        "evidence_capability": "E3",
        "support_level": "H1",
        "answer_revealing_exposure": false,
        "contamination_status": "NONE",
        "changed_context_qualified": true,
        "delay_qualified": false,
        "version_compatibility": true,
        "familiarity_qualified": true,
        "reason_codes": [
          "FAILED_CRITICAL_REGISTER_MISMATCH"
        ],
        "awarded_tier": "NONE",
        "source_event_ids": []
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F17",
      "description": "'Hä?' signals non-understanding but is deterministically rejected for the declared polite Sie service register.",
      "activity_id": "ACT-DE-N2-E3-01",
      "skill_id": "GER-SVC-REPAIR-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "Hä?",
        "normalized_input": "Hä?",
        "matched_variant_id": "NONCAN-DE-N2-02",
        "runtime_activity_context_present": true
      },
      "expected_attempt_evaluation": {
        "raw_input": "Hä?",
        "normalized_input": "Hä?",
        "matched_variant_id": "NONCAN-DE-N2-02",
        "evaluation_outcome": "failed_critical",
        "intent_outcome": "achieved",
        "form_outcome": "acceptable",
        "register_outcome": "mismatch",
        "error_codes": [
          "REGISTER_COLLOQUIAL_ABRUPT"
        ],
        "evaluator_confidence_bucket": "HIGH_DETERMINISTIC"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N2-E3-01",
        "skill_id": "GER-SVC-REPAIR-01",
        "evidence_lane": "typed_production",
        "evidence_capability": "E3",
        "support_level": "H1",
        "answer_revealing_exposure": false,
        "contamination_status": "NONE",
        "changed_context_qualified": true,
        "delay_qualified": false,
        "version_compatibility": true,
        "familiarity_qualified": true,
        "reason_codes": [
          "FAILED_CRITICAL_REGISTER_MISMATCH"
        ],
        "awarded_tier": "NONE",
        "source_event_ids": []
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F18",
      "description": "Global ss -> ß rewriting is rejected; raw input and normalized input preserved separately.",
      "activity_id": "ACT-DE-N1-E3-01",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "Einen grossen Kaffee bitte.",
        "normalized_input": "Einen grossen Kaffee bitte.",
        "applied_normalization": "INVALID_GLOBAL_SS_TO_ESZETT",
        "matched_variant_id": null,
        "runtime_activity_context_present": true
      },
      "expected_attempt_evaluation": {
        "raw_input": "Einen grossen Kaffee bitte.",
        "normalized_input": "Einen grossen Kaffee bitte.",
        "matched_variant_id": null,
        "evaluation_outcome": "unscored",
        "intent_outcome": "uncertain",
        "form_outcome": "uncertain",
        "register_outcome": "uncertain",
        "error_codes": [
          "INVALID_NORMALIZATION_RULE"
        ],
        "evaluator_confidence_bucket": "TECHNICAL_UNCERTAINTY"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N1-E3-01",
        "skill_id": "GER-SVC-REQUEST-ONE-01",
        "evidence_lane": "typed_production",
        "evidence_capability": "E3",
        "support_level": "H1",
        "answer_revealing_exposure": false,
        "contamination_status": "NONE",
        "changed_context_qualified": true,
        "delay_qualified": false,
        "version_compatibility": false,
        "familiarity_qualified": true,
        "reason_codes": [
          "INVALID_NORMALIZATION_APPLIED"
        ],
        "awarded_tier": "NONE",
        "source_event_ids": []
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F19-E4-CLEAN-26H",
      "description": "Valid 26-hour clean delay return with familiar item awards E4.",
      "activity_id": "ACT-DE-N1-E4-01",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "Einen Apfelsaft, bitte.",
        "normalized_input": "Einen Apfelsaft, bitte.",
        "matched_variant_id": "VAR-DE-N1-09",
        "seconds_since_prior_e3": 93600,
        "seconds_since_last_answer_reveal": null,
        "prior_e3_event_id": "EVT-ERR-F19-E4-CLEAN-26H-PRIOR-E3",
        "prior_e3_skill_id": "GER-SVC-REQUEST-ONE-01",
        "prior_e3_lane": "typed_production",
        "runtime_activity_context_present": true,
        "attempt_event_id": "EVT-ERR-F19-E4-CLEAN-26H-CURRENT-ATTEMPT",
        "attempt_at": "2026-09-02T12:00:00Z",
        "current_activity_id": "ACT-DE-N1-E4-01",
        "current_skill_id": "GER-SVC-REQUEST-ONE-01",
        "current_evidence_lane": "typed_production",
        "current_versions": {
          "content_version": "2.1.0-candidate",
          "evidence_policy_version": "1.1",
          "rubric_id": "RUBRIC-DE-N1-REQ-01",
          "rubric_version": "2.1.0"
        },
        "prior_e3_event": {
          "event_id": "EVT-ERR-F19-E4-CLEAN-26H-PRIOR-E3",
          "activity_id": "ACT-DE-N1-E3-01",
          "skill_id": "GER-SVC-REQUEST-ONE-01",
          "evidence_lane": "typed_production",
          "awarded_tier": "E3",
          "occurred_at": "2026-09-01T10:00:00.000Z",
          "versions": {
            "content_version": "2.1.0-candidate",
            "evidence_policy_version": "1.1",
            "rubric_id": "RUBRIC-DE-N1-REQ-01",
            "rubric_version": "2.1.0"
          }
        },
        "last_answer_revealing_exposure_event": null,
        "context_change_evidence": {
          "baseline_activity_id": "ACT-DE-N1-E3-01",
          "baseline_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "bakery",
            "referent_or_information_slot": "tea",
            "interlocutor": "baker",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "current_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "station_kiosk",
            "referent_or_information_slot": "apple_juice",
            "interlocutor": "kiosk_clerk",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "qualified_changed_dimensions": [
            {
              "dimension": "venue",
              "from": "bakery",
              "to": "station_kiosk",
              "relevance": "CONTEXTUAL"
            },
            {
              "dimension": "referent_or_information_slot",
              "from": "tea",
              "to": "apple_juice",
              "relevance": "SEMANTIC_RETRIEVAL"
            },
            {
              "dimension": "interlocutor",
              "from": "baker",
              "to": "kiosk_clerk",
              "relevance": "CONTEXTUAL"
            }
          ]
        },
        "familiarity_evidence": [
          {
            "item_id": "LEX-DE-003",
            "status": "VISIBLE_IN_NATURAL_CONTEXT",
            "source_type": "CURRENT_ACTIVITY_VISIBLE_CONTENT",
            "source_path": "/activities/7/content_de",
            "source_event_id": null
          },
          {
            "item_id": "LEX-DE-004",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-004"
          },
          {
            "item_id": "LEX-DE-006",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-006"
          }
        ],
        "rubric_version_used": "2.1.0"
      },
      "expected_attempt_evaluation": {
        "raw_input": "Einen Apfelsaft, bitte.",
        "normalized_input": "Einen Apfelsaft, bitte.",
        "matched_variant_id": "VAR-DE-N1-09",
        "evaluation_outcome": "accepted_clean",
        "intent_outcome": "achieved",
        "form_outcome": "acceptable",
        "register_outcome": "appropriate",
        "error_codes": [],
        "evaluator_confidence_bucket": "HIGH_DETERMINISTIC"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N1-E4-01",
        "skill_id": "GER-SVC-REQUEST-ONE-01",
        "evidence_lane": "typed_production",
        "evidence_capability": "E4",
        "support_level": "H1",
        "answer_revealing_exposure": false,
        "contamination_status": "NONE",
        "changed_context_qualified": true,
        "delay_qualified": true,
        "version_compatibility": true,
        "familiarity_qualified": true,
        "reason_codes": [
          "DELAYED_RETURN_E4_QUALIFIED"
        ],
        "awarded_tier": "E4",
        "source_event_ids": [
          "EVT-ERR-F19-E4-CLEAN-26H-PRIOR-E3",
          "EVT-FAMILIAR-LEX-DE-004",
          "EVT-FAMILIAR-LEX-DE-006"
        ]
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F20-E4-TOO-EARLY",
      "description": "Return check after only 2 hours clean delay cannot grant E4.",
      "activity_id": "ACT-DE-N1-E4-01",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "Einen Apfelsaft, bitte.",
        "normalized_input": "Einen Apfelsaft, bitte.",
        "matched_variant_id": "VAR-DE-N1-09",
        "seconds_since_prior_e3": 7200,
        "seconds_since_last_answer_reveal": null,
        "prior_e3_event_id": "EVT-ERR-F20-E4-TOO-EARLY-PRIOR-E3",
        "runtime_activity_context_present": true,
        "attempt_event_id": "EVT-ERR-F20-E4-TOO-EARLY-CURRENT-ATTEMPT",
        "attempt_at": "2026-09-02T12:00:00Z",
        "current_activity_id": "ACT-DE-N1-E4-01",
        "current_skill_id": "GER-SVC-REQUEST-ONE-01",
        "current_evidence_lane": "typed_production",
        "current_versions": {
          "content_version": "2.1.0-candidate",
          "evidence_policy_version": "1.1",
          "rubric_id": "RUBRIC-DE-N1-REQ-01",
          "rubric_version": "2.1.0"
        },
        "prior_e3_event": {
          "event_id": "EVT-ERR-F20-E4-TOO-EARLY-PRIOR-E3",
          "activity_id": "ACT-DE-N1-E3-01",
          "skill_id": "GER-SVC-REQUEST-ONE-01",
          "evidence_lane": "typed_production",
          "awarded_tier": "E3",
          "occurred_at": "2026-09-02T10:00:00.000Z",
          "versions": {
            "content_version": "2.1.0-candidate",
            "evidence_policy_version": "1.1",
            "rubric_id": "RUBRIC-DE-N1-REQ-01",
            "rubric_version": "2.1.0"
          }
        },
        "last_answer_revealing_exposure_event": null,
        "context_change_evidence": {
          "baseline_activity_id": "ACT-DE-N1-E3-01",
          "baseline_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "bakery",
            "referent_or_information_slot": "tea",
            "interlocutor": "baker",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "current_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "station_kiosk",
            "referent_or_information_slot": "apple_juice",
            "interlocutor": "kiosk_clerk",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "qualified_changed_dimensions": [
            {
              "dimension": "venue",
              "from": "bakery",
              "to": "station_kiosk",
              "relevance": "CONTEXTUAL"
            },
            {
              "dimension": "referent_or_information_slot",
              "from": "tea",
              "to": "apple_juice",
              "relevance": "SEMANTIC_RETRIEVAL"
            },
            {
              "dimension": "interlocutor",
              "from": "baker",
              "to": "kiosk_clerk",
              "relevance": "CONTEXTUAL"
            }
          ]
        },
        "familiarity_evidence": [
          {
            "item_id": "LEX-DE-003",
            "status": "VISIBLE_IN_NATURAL_CONTEXT",
            "source_type": "CURRENT_ACTIVITY_VISIBLE_CONTENT",
            "source_path": "/activities/7/content_de",
            "source_event_id": null
          },
          {
            "item_id": "LEX-DE-004",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-004"
          },
          {
            "item_id": "LEX-DE-006",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-006"
          }
        ],
        "prior_e3_skill_id": "GER-SVC-REQUEST-ONE-01",
        "prior_e3_lane": "typed_production",
        "rubric_version_used": "2.1.0"
      },
      "expected_attempt_evaluation": {
        "raw_input": "Einen Apfelsaft, bitte.",
        "normalized_input": "Einen Apfelsaft, bitte.",
        "matched_variant_id": "VAR-DE-N1-09",
        "evaluation_outcome": "accepted_clean",
        "intent_outcome": "achieved",
        "form_outcome": "acceptable",
        "register_outcome": "appropriate",
        "error_codes": [],
        "evaluator_confidence_bucket": "HIGH_DETERMINISTIC"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N1-E4-01",
        "skill_id": "GER-SVC-REQUEST-ONE-01",
        "evidence_lane": "typed_production",
        "evidence_capability": "E4",
        "support_level": "H1",
        "answer_revealing_exposure": false,
        "contamination_status": "NONE",
        "changed_context_qualified": true,
        "delay_qualified": false,
        "version_compatibility": true,
        "familiarity_qualified": true,
        "reason_codes": [
          "DELAY_THRESHOLD_NOT_MET"
        ],
        "awarded_tier": "E3",
        "source_event_ids": [
          "EVT-ERR-F20-E4-TOO-EARLY-PRIOR-E3",
          "EVT-FAMILIAR-LEX-DE-004",
          "EVT-FAMILIAR-LEX-DE-006"
        ]
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F21-E4-PRIOR-E3-MISSING",
      "description": "Return check attempted without prior E3 in skill cannot award E4.",
      "activity_id": "ACT-DE-N1-E4-01",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "Einen Apfelsaft, bitte.",
        "normalized_input": "Einen Apfelsaft, bitte.",
        "matched_variant_id": "VAR-DE-N1-09",
        "prior_e3_event_id": null,
        "runtime_activity_context_present": true,
        "attempt_event_id": "EVT-ERR-F21-E4-PRIOR-E3-MISSING-CURRENT-ATTEMPT",
        "attempt_at": "2026-09-02T12:00:00Z",
        "current_activity_id": "ACT-DE-N1-E4-01",
        "current_skill_id": "GER-SVC-REQUEST-ONE-01",
        "current_evidence_lane": "typed_production",
        "current_versions": {
          "content_version": "2.1.0-candidate",
          "evidence_policy_version": "1.1",
          "rubric_id": "RUBRIC-DE-N1-REQ-01",
          "rubric_version": "2.1.0"
        },
        "prior_e3_event": null,
        "last_answer_revealing_exposure_event": null,
        "context_change_evidence": {
          "baseline_activity_id": "ACT-DE-N1-E3-01",
          "baseline_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "bakery",
            "referent_or_information_slot": "tea",
            "interlocutor": "baker",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "current_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "station_kiosk",
            "referent_or_information_slot": "apple_juice",
            "interlocutor": "kiosk_clerk",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "qualified_changed_dimensions": [
            {
              "dimension": "venue",
              "from": "bakery",
              "to": "station_kiosk",
              "relevance": "CONTEXTUAL"
            },
            {
              "dimension": "referent_or_information_slot",
              "from": "tea",
              "to": "apple_juice",
              "relevance": "SEMANTIC_RETRIEVAL"
            },
            {
              "dimension": "interlocutor",
              "from": "baker",
              "to": "kiosk_clerk",
              "relevance": "CONTEXTUAL"
            }
          ]
        },
        "familiarity_evidence": [
          {
            "item_id": "LEX-DE-003",
            "status": "VISIBLE_IN_NATURAL_CONTEXT",
            "source_type": "CURRENT_ACTIVITY_VISIBLE_CONTENT",
            "source_path": "/activities/7/content_de",
            "source_event_id": null
          },
          {
            "item_id": "LEX-DE-004",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-004"
          },
          {
            "item_id": "LEX-DE-006",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-006"
          }
        ],
        "seconds_since_prior_e3": null,
        "seconds_since_last_answer_reveal": null,
        "prior_e3_skill_id": null,
        "prior_e3_lane": null,
        "rubric_version_used": "2.1.0"
      },
      "expected_attempt_evaluation": {
        "raw_input": "Einen Apfelsaft, bitte.",
        "normalized_input": "Einen Apfelsaft, bitte.",
        "matched_variant_id": "VAR-DE-N1-09",
        "evaluation_outcome": "accepted_clean",
        "intent_outcome": "achieved",
        "form_outcome": "acceptable",
        "register_outcome": "appropriate",
        "error_codes": [],
        "evaluator_confidence_bucket": "HIGH_DETERMINISTIC"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N1-E4-01",
        "skill_id": "GER-SVC-REQUEST-ONE-01",
        "evidence_lane": "typed_production",
        "evidence_capability": "E4",
        "support_level": "H1",
        "answer_revealing_exposure": false,
        "contamination_status": "NONE",
        "changed_context_qualified": true,
        "delay_qualified": false,
        "version_compatibility": true,
        "familiarity_qualified": true,
        "reason_codes": [
          "MISSING_PRIOR_E3_RECORD"
        ],
        "awarded_tier": "E3",
        "source_event_ids": [
          "EVT-FAMILIAR-LEX-DE-004",
          "EVT-FAMILIAR-LEX-DE-006"
        ]
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F22-E4-CROSS-MODAL",
      "description": "Prior E3 in reading lane does not satisfy typed production E4 requirement.",
      "activity_id": "ACT-DE-N1-E4-01",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "Einen Apfelsaft, bitte.",
        "normalized_input": "Einen Apfelsaft, bitte.",
        "matched_variant_id": "VAR-DE-N1-09",
        "prior_e3_event_id": "EVT-ERR-F22-E4-CROSS-MODAL-PRIOR-E3",
        "prior_e3_lane": "read_recognition",
        "runtime_activity_context_present": true,
        "attempt_event_id": "EVT-ERR-F22-E4-CROSS-MODAL-CURRENT-ATTEMPT",
        "attempt_at": "2026-09-02T12:00:00Z",
        "current_activity_id": "ACT-DE-N1-E4-01",
        "current_skill_id": "GER-SVC-REQUEST-ONE-01",
        "current_evidence_lane": "typed_production",
        "current_versions": {
          "content_version": "2.1.0-candidate",
          "evidence_policy_version": "1.1",
          "rubric_id": "RUBRIC-DE-N1-REQ-01",
          "rubric_version": "2.1.0"
        },
        "prior_e3_event": {
          "event_id": "EVT-ERR-F22-E4-CROSS-MODAL-PRIOR-E3",
          "activity_id": "ACT-DE-N1-E3-01",
          "skill_id": "GER-SVC-REQUEST-ONE-01",
          "evidence_lane": "read_recognition",
          "awarded_tier": "E3",
          "occurred_at": "2026-09-01T10:00:00.000Z",
          "versions": {
            "content_version": "2.1.0-candidate",
            "evidence_policy_version": "1.1",
            "rubric_id": "RUBRIC-DE-N1-REQ-01",
            "rubric_version": "2.1.0"
          }
        },
        "last_answer_revealing_exposure_event": null,
        "context_change_evidence": {
          "baseline_activity_id": "ACT-DE-N1-E3-01",
          "baseline_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "bakery",
            "referent_or_information_slot": "tea",
            "interlocutor": "baker",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "current_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "station_kiosk",
            "referent_or_information_slot": "apple_juice",
            "interlocutor": "kiosk_clerk",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "qualified_changed_dimensions": [
            {
              "dimension": "venue",
              "from": "bakery",
              "to": "station_kiosk",
              "relevance": "CONTEXTUAL"
            },
            {
              "dimension": "referent_or_information_slot",
              "from": "tea",
              "to": "apple_juice",
              "relevance": "SEMANTIC_RETRIEVAL"
            },
            {
              "dimension": "interlocutor",
              "from": "baker",
              "to": "kiosk_clerk",
              "relevance": "CONTEXTUAL"
            }
          ]
        },
        "familiarity_evidence": [
          {
            "item_id": "LEX-DE-003",
            "status": "VISIBLE_IN_NATURAL_CONTEXT",
            "source_type": "CURRENT_ACTIVITY_VISIBLE_CONTENT",
            "source_path": "/activities/7/content_de",
            "source_event_id": null
          },
          {
            "item_id": "LEX-DE-004",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-004"
          },
          {
            "item_id": "LEX-DE-006",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-006"
          }
        ],
        "seconds_since_prior_e3": 93600,
        "seconds_since_last_answer_reveal": null,
        "prior_e3_skill_id": "GER-SVC-REQUEST-ONE-01",
        "rubric_version_used": "2.1.0"
      },
      "expected_attempt_evaluation": {
        "raw_input": "Einen Apfelsaft, bitte.",
        "normalized_input": "Einen Apfelsaft, bitte.",
        "matched_variant_id": "VAR-DE-N1-09",
        "evaluation_outcome": "accepted_clean",
        "intent_outcome": "achieved",
        "form_outcome": "acceptable",
        "register_outcome": "appropriate",
        "error_codes": [],
        "evaluator_confidence_bucket": "HIGH_DETERMINISTIC"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N1-E4-01",
        "skill_id": "GER-SVC-REQUEST-ONE-01",
        "evidence_lane": "typed_production",
        "evidence_capability": "E4",
        "support_level": "H1",
        "answer_revealing_exposure": false,
        "contamination_status": "NONE",
        "changed_context_qualified": true,
        "delay_qualified": false,
        "version_compatibility": true,
        "familiarity_qualified": true,
        "reason_codes": [
          "CROSS_MODAL_PRIOR_E3_INVALID"
        ],
        "awarded_tier": "E3",
        "source_event_ids": [
          "EVT-ERR-F22-E4-CROSS-MODAL-PRIOR-E3",
          "EVT-FAMILIAR-LEX-DE-004",
          "EVT-FAMILIAR-LEX-DE-006"
        ]
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F23-E4-ANSWER-REVEAL-RESET",
      "description": "Answer reveal occurring 15 minutes before E4 return resets clean delay.",
      "activity_id": "ACT-DE-N1-E4-01",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "Einen Apfelsaft, bitte.",
        "normalized_input": "Einen Apfelsaft, bitte.",
        "matched_variant_id": "VAR-DE-N1-09",
        "seconds_since_last_answer_reveal": 900,
        "prior_e3_event_id": "EVT-ERR-F23-E4-ANSWER-REVEAL-RESET-PRIOR-E3",
        "runtime_activity_context_present": true,
        "attempt_event_id": "EVT-ERR-F23-E4-ANSWER-REVEAL-RESET-CURRENT-ATTEMPT",
        "attempt_at": "2026-09-02T12:00:00Z",
        "current_activity_id": "ACT-DE-N1-E4-01",
        "current_skill_id": "GER-SVC-REQUEST-ONE-01",
        "current_evidence_lane": "typed_production",
        "current_versions": {
          "content_version": "2.1.0-candidate",
          "evidence_policy_version": "1.1",
          "rubric_id": "RUBRIC-DE-N1-REQ-01",
          "rubric_version": "2.1.0"
        },
        "prior_e3_event": {
          "event_id": "EVT-ERR-F23-E4-ANSWER-REVEAL-RESET-PRIOR-E3",
          "activity_id": "ACT-DE-N1-E3-01",
          "skill_id": "GER-SVC-REQUEST-ONE-01",
          "evidence_lane": "typed_production",
          "awarded_tier": "E3",
          "occurred_at": "2026-09-01T10:00:00.000Z",
          "versions": {
            "content_version": "2.1.0-candidate",
            "evidence_policy_version": "1.1",
            "rubric_id": "RUBRIC-DE-N1-REQ-01",
            "rubric_version": "2.1.0"
          }
        },
        "last_answer_revealing_exposure_event": {
          "event_id": "EVT-ERR-F23-E4-ANSWER-REVEAL-RESET-ANSWER-REVEAL",
          "event_type": "AnswerRevealingExposureRecorded",
          "skill_id": "GER-SVC-REQUEST-ONE-01",
          "occurred_at": "2026-09-02T11:45:00.000Z"
        },
        "context_change_evidence": {
          "baseline_activity_id": "ACT-DE-N1-E3-01",
          "baseline_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "bakery",
            "referent_or_information_slot": "tea",
            "interlocutor": "baker",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "current_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "station_kiosk",
            "referent_or_information_slot": "apple_juice",
            "interlocutor": "kiosk_clerk",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "qualified_changed_dimensions": [
            {
              "dimension": "venue",
              "from": "bakery",
              "to": "station_kiosk",
              "relevance": "CONTEXTUAL"
            },
            {
              "dimension": "referent_or_information_slot",
              "from": "tea",
              "to": "apple_juice",
              "relevance": "SEMANTIC_RETRIEVAL"
            },
            {
              "dimension": "interlocutor",
              "from": "baker",
              "to": "kiosk_clerk",
              "relevance": "CONTEXTUAL"
            }
          ]
        },
        "familiarity_evidence": [
          {
            "item_id": "LEX-DE-003",
            "status": "VISIBLE_IN_NATURAL_CONTEXT",
            "source_type": "CURRENT_ACTIVITY_VISIBLE_CONTENT",
            "source_path": "/activities/7/content_de",
            "source_event_id": null
          },
          {
            "item_id": "LEX-DE-004",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-004"
          },
          {
            "item_id": "LEX-DE-006",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-006"
          }
        ],
        "seconds_since_prior_e3": 93600,
        "prior_e3_skill_id": "GER-SVC-REQUEST-ONE-01",
        "prior_e3_lane": "typed_production",
        "rubric_version_used": "2.1.0"
      },
      "expected_attempt_evaluation": {
        "raw_input": "Einen Apfelsaft, bitte.",
        "normalized_input": "Einen Apfelsaft, bitte.",
        "matched_variant_id": "VAR-DE-N1-09",
        "evaluation_outcome": "accepted_clean",
        "intent_outcome": "achieved",
        "form_outcome": "acceptable",
        "register_outcome": "appropriate",
        "error_codes": [],
        "evaluator_confidence_bucket": "HIGH_DETERMINISTIC"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N1-E4-01",
        "skill_id": "GER-SVC-REQUEST-ONE-01",
        "evidence_lane": "typed_production",
        "evidence_capability": "E4",
        "support_level": "H1",
        "answer_revealing_exposure": false,
        "contamination_status": "NONE",
        "changed_context_qualified": true,
        "delay_qualified": false,
        "version_compatibility": true,
        "familiarity_qualified": true,
        "reason_codes": [
          "DELAY_RESET_BY_EXPOSURE"
        ],
        "awarded_tier": "E3",
        "source_event_ids": [
          "EVT-ERR-F23-E4-ANSWER-REVEAL-RESET-PRIOR-E3",
          "EVT-ERR-F23-E4-ANSWER-REVEAL-RESET-ANSWER-REVEAL",
          "EVT-FAMILIAR-LEX-DE-004",
          "EVT-FAMILIAR-LEX-DE-006"
        ]
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F24-E4-INCOMPATIBLE-RUBRIC",
      "description": "Rubric version mismatch prevents automatic E4 qualification.",
      "activity_id": "ACT-DE-N1-E4-01",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "Einen Apfelsaft, bitte.",
        "normalized_input": "Einen Apfelsaft, bitte.",
        "matched_variant_id": "VAR-DE-N1-09",
        "rubric_version_used": "0.9.0-incompatible",
        "runtime_activity_context_present": true,
        "attempt_event_id": "EVT-ERR-F24-E4-INCOMPATIBLE-RUBRIC-CURRENT-ATTEMPT",
        "attempt_at": "2026-09-02T12:00:00Z",
        "current_activity_id": "ACT-DE-N1-E4-01",
        "current_skill_id": "GER-SVC-REQUEST-ONE-01",
        "current_evidence_lane": "typed_production",
        "current_versions": {
          "content_version": "2.1.0-candidate",
          "evidence_policy_version": "1.1",
          "rubric_id": "RUBRIC-DE-N1-REQ-01",
          "rubric_version": "2.1.0"
        },
        "prior_e3_event": {
          "event_id": "EVT-ERR-F24-E4-INCOMPATIBLE-RUBRIC-PRIOR-E3",
          "activity_id": "ACT-DE-N1-E3-01",
          "skill_id": "GER-SVC-REQUEST-ONE-01",
          "evidence_lane": "typed_production",
          "awarded_tier": "E3",
          "occurred_at": "2026-09-01T10:00:00.000Z",
          "versions": {
            "content_version": "2.1.0-candidate",
            "evidence_policy_version": "1.1",
            "rubric_id": "RUBRIC-DE-N1-REQ-01",
            "rubric_version": "0.9.0-incompatible"
          }
        },
        "last_answer_revealing_exposure_event": null,
        "context_change_evidence": {
          "baseline_activity_id": "ACT-DE-N1-E3-01",
          "baseline_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "bakery",
            "referent_or_information_slot": "tea",
            "interlocutor": "baker",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "current_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "station_kiosk",
            "referent_or_information_slot": "apple_juice",
            "interlocutor": "kiosk_clerk",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "qualified_changed_dimensions": [
            {
              "dimension": "venue",
              "from": "bakery",
              "to": "station_kiosk",
              "relevance": "CONTEXTUAL"
            },
            {
              "dimension": "referent_or_information_slot",
              "from": "tea",
              "to": "apple_juice",
              "relevance": "SEMANTIC_RETRIEVAL"
            },
            {
              "dimension": "interlocutor",
              "from": "baker",
              "to": "kiosk_clerk",
              "relevance": "CONTEXTUAL"
            }
          ]
        },
        "familiarity_evidence": [
          {
            "item_id": "LEX-DE-003",
            "status": "VISIBLE_IN_NATURAL_CONTEXT",
            "source_type": "CURRENT_ACTIVITY_VISIBLE_CONTENT",
            "source_path": "/activities/7/content_de",
            "source_event_id": null
          },
          {
            "item_id": "LEX-DE-004",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-004"
          },
          {
            "item_id": "LEX-DE-006",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-006"
          }
        ],
        "seconds_since_prior_e3": 93600,
        "seconds_since_last_answer_reveal": null,
        "prior_e3_event_id": "EVT-ERR-F24-E4-INCOMPATIBLE-RUBRIC-PRIOR-E3",
        "prior_e3_skill_id": "GER-SVC-REQUEST-ONE-01",
        "prior_e3_lane": "typed_production"
      },
      "expected_attempt_evaluation": {
        "raw_input": "Einen Apfelsaft, bitte.",
        "normalized_input": "Einen Apfelsaft, bitte.",
        "matched_variant_id": "VAR-DE-N1-09",
        "evaluation_outcome": "unscored",
        "intent_outcome": "uncertain",
        "form_outcome": "uncertain",
        "register_outcome": "uncertain",
        "error_codes": [],
        "evaluator_confidence_bucket": "TECHNICAL_UNCERTAINTY"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N1-E4-01",
        "skill_id": "GER-SVC-REQUEST-ONE-01",
        "evidence_lane": "typed_production",
        "evidence_capability": "E4",
        "support_level": "H1",
        "answer_revealing_exposure": false,
        "contamination_status": "NONE",
        "changed_context_qualified": true,
        "delay_qualified": true,
        "version_compatibility": false,
        "familiarity_qualified": true,
        "reason_codes": [
          "RUBRIC_VERSION_MISMATCH"
        ],
        "awarded_tier": "NONE",
        "source_event_ids": [
          "EVT-ERR-F24-E4-INCOMPATIBLE-RUBRIC-PRIOR-E3",
          "EVT-FAMILIAR-LEX-DE-004",
          "EVT-FAMILIAR-LEX-DE-006"
        ]
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F25-E4-MISSING-FAMILIARITY",
      "description": "Target item not pre-taught or visible results in unscored prerequisite missing.",
      "activity_id": "ACT-DE-N1-E4-01",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "Einen Orangensaft, bitte.",
        "normalized_input": "Einen Orangensaft, bitte.",
        "matched_variant_id": null,
        "item_familiarity": "UNTAUGHT_NO_RECORD",
        "runtime_activity_context_present": true,
        "attempt_event_id": "EVT-ERR-F25-E4-MISSING-FAMILIARITY-CURRENT-ATTEMPT",
        "attempt_at": "2026-09-02T12:00:00Z",
        "current_activity_id": "ACT-DE-N1-E4-01",
        "current_skill_id": "GER-SVC-REQUEST-ONE-01",
        "current_evidence_lane": "typed_production",
        "current_versions": {
          "content_version": "2.1.0-candidate",
          "evidence_policy_version": "1.1",
          "rubric_id": "RUBRIC-DE-N1-REQ-01",
          "rubric_version": "2.1.0"
        },
        "prior_e3_event": {
          "event_id": "EVT-ERR-F25-E4-MISSING-FAMILIARITY-PRIOR-E3",
          "activity_id": "ACT-DE-N1-E3-01",
          "skill_id": "GER-SVC-REQUEST-ONE-01",
          "evidence_lane": "typed_production",
          "awarded_tier": "E3",
          "occurred_at": "2026-09-01T10:00:00.000Z",
          "versions": {
            "content_version": "2.1.0-candidate",
            "evidence_policy_version": "1.1",
            "rubric_id": "RUBRIC-DE-N1-REQ-01",
            "rubric_version": "2.1.0"
          }
        },
        "last_answer_revealing_exposure_event": null,
        "context_change_evidence": {
          "baseline_activity_id": "ACT-DE-N1-E3-01",
          "baseline_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "bakery",
            "referent_or_information_slot": "tea",
            "interlocutor": "baker",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "current_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "station_kiosk",
            "referent_or_information_slot": "apple_juice",
            "interlocutor": "kiosk_clerk",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "qualified_changed_dimensions": [
            {
              "dimension": "venue",
              "from": "bakery",
              "to": "station_kiosk",
              "relevance": "CONTEXTUAL"
            },
            {
              "dimension": "referent_or_information_slot",
              "from": "tea",
              "to": "apple_juice",
              "relevance": "SEMANTIC_RETRIEVAL"
            },
            {
              "dimension": "interlocutor",
              "from": "baker",
              "to": "kiosk_clerk",
              "relevance": "CONTEXTUAL"
            }
          ]
        },
        "familiarity_evidence": [
          {
            "item_id": "LEX-DE-004",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-004"
          },
          {
            "item_id": "LEX-DE-006",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-006"
          }
        ],
        "seconds_since_prior_e3": 93600,
        "seconds_since_last_answer_reveal": null,
        "prior_e3_event_id": "EVT-ERR-F25-E4-MISSING-FAMILIARITY-PRIOR-E3",
        "prior_e3_skill_id": "GER-SVC-REQUEST-ONE-01",
        "prior_e3_lane": "typed_production",
        "rubric_version_used": "2.1.0"
      },
      "expected_attempt_evaluation": {
        "raw_input": "Einen Orangensaft, bitte.",
        "normalized_input": "Einen Orangensaft, bitte.",
        "matched_variant_id": null,
        "evaluation_outcome": "unscored",
        "intent_outcome": "uncertain",
        "form_outcome": "uncertain",
        "register_outcome": "uncertain",
        "error_codes": [],
        "evaluator_confidence_bucket": "REVIEW_REQUIRED"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N1-E4-01",
        "skill_id": "GER-SVC-REQUEST-ONE-01",
        "evidence_lane": "typed_production",
        "evidence_capability": "E4",
        "support_level": "H1",
        "answer_revealing_exposure": false,
        "contamination_status": "NONE",
        "changed_context_qualified": true,
        "delay_qualified": true,
        "version_compatibility": true,
        "familiarity_qualified": false,
        "reason_codes": [
          "UNSCORED_PREREQUISITE_MISSING"
        ],
        "awarded_tier": "NONE",
        "source_event_ids": [
          "EVT-ERR-F25-E4-MISSING-FAMILIARITY-PRIOR-E3",
          "EVT-FAMILIAR-LEX-DE-004",
          "EVT-FAMILIAR-LEX-DE-006"
        ]
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F26-E4-FAILED-RETURN",
      "description": "Failed return attempt preserves historical E3 and transitions attention state to needs_repair.",
      "activity_id": "ACT-DE-N1-E4-01",
      "skill_id": "GER-SVC-REQUEST-ONE-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "Kaffee!",
        "normalized_input": "Kaffee!",
        "matched_variant_id": "NONCAN-DE-N1-01",
        "prior_e3_event_id": "EVT-ERR-F26-E4-FAILED-RETURN-PRIOR-E3",
        "seconds_since_prior_e3": 93600,
        "seconds_since_last_answer_reveal": null,
        "runtime_activity_context_present": true,
        "attempt_event_id": "EVT-ERR-F26-E4-FAILED-RETURN-CURRENT-ATTEMPT",
        "attempt_at": "2026-09-02T12:00:00Z",
        "current_activity_id": "ACT-DE-N1-E4-01",
        "current_skill_id": "GER-SVC-REQUEST-ONE-01",
        "current_evidence_lane": "typed_production",
        "current_versions": {
          "content_version": "2.1.0-candidate",
          "evidence_policy_version": "1.1",
          "rubric_id": "RUBRIC-DE-N1-REQ-01",
          "rubric_version": "2.1.0"
        },
        "prior_e3_event": {
          "event_id": "EVT-ERR-F26-E4-FAILED-RETURN-PRIOR-E3",
          "activity_id": "ACT-DE-N1-E3-01",
          "skill_id": "GER-SVC-REQUEST-ONE-01",
          "evidence_lane": "typed_production",
          "awarded_tier": "E3",
          "occurred_at": "2026-09-01T10:00:00.000Z",
          "versions": {
            "content_version": "2.1.0-candidate",
            "evidence_policy_version": "1.1",
            "rubric_id": "RUBRIC-DE-N1-REQ-01",
            "rubric_version": "2.1.0"
          }
        },
        "last_answer_revealing_exposure_event": null,
        "context_change_evidence": {
          "baseline_activity_id": "ACT-DE-N1-E3-01",
          "baseline_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "bakery",
            "referent_or_information_slot": "tea",
            "interlocutor": "baker",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "current_context_vector": {
            "intent_code": "SERVICE_REQUEST_ONE",
            "venue": "station_kiosk",
            "referent_or_information_slot": "apple_juice",
            "interlocutor": "kiosk_clerk",
            "dialogue_position": "initial_order",
            "prompt_surface": "free_typed_simulation",
            "stimulus_modality": "text",
            "distractor_set": "none"
          },
          "qualified_changed_dimensions": [
            {
              "dimension": "venue",
              "from": "bakery",
              "to": "station_kiosk",
              "relevance": "CONTEXTUAL"
            },
            {
              "dimension": "referent_or_information_slot",
              "from": "tea",
              "to": "apple_juice",
              "relevance": "SEMANTIC_RETRIEVAL"
            },
            {
              "dimension": "interlocutor",
              "from": "baker",
              "to": "kiosk_clerk",
              "relevance": "CONTEXTUAL"
            }
          ]
        },
        "familiarity_evidence": [
          {
            "item_id": "LEX-DE-003",
            "status": "VISIBLE_IN_NATURAL_CONTEXT",
            "source_type": "CURRENT_ACTIVITY_VISIBLE_CONTENT",
            "source_path": "/activities/7/content_de",
            "source_event_id": null
          },
          {
            "item_id": "LEX-DE-004",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-004"
          },
          {
            "item_id": "LEX-DE-006",
            "status": "PRETAUGHT_ACCEPTED",
            "source_type": "PRIOR_LEARNING_EVENT",
            "source_path": null,
            "source_event_id": "EVT-FAMILIAR-LEX-DE-006"
          }
        ],
        "prior_e3_skill_id": "GER-SVC-REQUEST-ONE-01",
        "prior_e3_lane": "typed_production",
        "rubric_version_used": "2.1.0"
      },
      "expected_attempt_evaluation": {
        "raw_input": "Kaffee!",
        "normalized_input": "Kaffee!",
        "matched_variant_id": "NONCAN-DE-N1-01",
        "evaluation_outcome": "failed_critical",
        "intent_outcome": "partial",
        "form_outcome": "minor_issue",
        "register_outcome": "mismatch",
        "error_codes": [
          "MISSING_POLITENESS_MARKER"
        ],
        "evaluator_confidence_bucket": "HIGH_DETERMINISTIC"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N1-E4-01",
        "skill_id": "GER-SVC-REQUEST-ONE-01",
        "evidence_lane": "typed_production",
        "evidence_capability": "E4",
        "support_level": "H1",
        "answer_revealing_exposure": false,
        "contamination_status": "NONE",
        "changed_context_qualified": true,
        "delay_qualified": true,
        "version_compatibility": true,
        "familiarity_qualified": true,
        "reason_codes": [
          "FAILED_CRITICAL_RETURN_ATTEMPT",
          "PRESERVE_HISTORICAL_E3",
          "TRANSITION_ATTENTION_STATE_NEEDS_REPAIR"
        ],
        "awarded_tier": "NONE",
        "source_event_ids": [
          "EVT-ERR-F26-E4-FAILED-RETURN-PRIOR-E3",
          "EVT-FAMILIAR-LEX-DE-004",
          "EVT-FAMILIAR-LEX-DE-006"
        ]
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    },
    {
      "fixture_id": "ERR-F27-TECH-UNCERTAINTY",
      "description": "Corrupted or unreadable input payload produces unscored technical uncertainty.",
      "activity_id": "ACT-DE-N2-E3-01",
      "skill_id": "GER-SVC-REPAIR-01",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review",
      "input_state": {
        "raw_input": "\u0000\u0000\u0000",
        "normalized_input": "\u0000\u0000\u0000",
        "matched_variant_id": null,
        "runtime_activity_context_present": true
      },
      "expected_attempt_evaluation": {
        "raw_input": "\u0000\u0000\u0000",
        "normalized_input": "\u0000\u0000\u0000",
        "matched_variant_id": null,
        "evaluation_outcome": "unscored",
        "intent_outcome": "uncertain",
        "form_outcome": "uncertain",
        "register_outcome": "uncertain",
        "error_codes": [
          "TECHNICAL_UNCERTAINTY"
        ],
        "evaluator_confidence_bucket": "TECHNICAL_UNCERTAINTY"
      },
      "expected_evidence_decision": {
        "activity_id": "ACT-DE-N2-E3-01",
        "skill_id": "GER-SVC-REPAIR-01",
        "evidence_lane": "typed_production",
        "evidence_capability": "E3",
        "support_level": "H1",
        "answer_revealing_exposure": false,
        "contamination_status": "NONE",
        "changed_context_qualified": true,
        "delay_qualified": false,
        "version_compatibility": false,
        "familiarity_qualified": true,
        "reason_codes": [
          "TECHNICAL_PAYLOAD_CORRUPTED"
        ],
        "awarded_tier": "NONE",
        "source_event_ids": []
      },
      "actual_attempt_evaluation": null,
      "actual_evidence_decision": null,
      "run_status": "NOT_RUN_NO_EVALUATOR",
      "rule_trace": [],
      "diff": []
    }
  ],
  "audio_scripts": [
    {
      "audio_id": "AUD-DE-N1-001",
      "transcript": "Guten Tag! Bitte schön?",
      "speaker_role": "CLERK_FEMALE",
      "locale": "de-DE",
      "register": "POLITE_FORMAL_SIE",
      "speaking_rate": "MODERATE_CLEAR",
      "performance_direction": "Friendly, welcoming service greeting at a standard cafe counter.",
      "scene": "CAFE_COUNTER",
      "linked_activity_ids": [
        "ACT-DE-N1-E0-01"
      ],
      "replay_policy": "UNLIMITED",
      "recorded_audio_status": "NOT_RECORDED",
      "text_audio_alignment_status": "NOT_APPLICABLE_NO_RECORDED_AUDIO",
      "audio_review_status": "PENDING_AFTER_RECORDING",
      "transcript_language_review_status": "candidate_pending_human_review",
      "speaker_permission_license_requirement": "WRITTEN_TALENT_RELEASE_REQUIRED",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "audio_id": "AUD-DE-N1-002",
      "transcript": "Einen Kaffee, bitte.",
      "speaker_role": "CUSTOMER_MALE",
      "locale": "de-DE",
      "register": "POLITE_FORMAL_SIE",
      "speaking_rate": "NATURAL_CLEAR",
      "performance_direction": "Clear, polite customer order with natural standard German pronunciation.",
      "scene": "CAFE_COUNTER",
      "linked_activity_ids": [
        "ACT-DE-N1-E0-01",
        "ACT-DE-N1-E1-01"
      ],
      "replay_policy": "UNLIMITED",
      "recorded_audio_status": "NOT_RECORDED",
      "text_audio_alignment_status": "NOT_APPLICABLE_NO_RECORDED_AUDIO",
      "audio_review_status": "PENDING_AFTER_RECORDING",
      "transcript_language_review_status": "candidate_pending_human_review",
      "speaker_permission_license_requirement": "WRITTEN_TALENT_RELEASE_REQUIRED",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "audio_id": "AUD-DE-N1-003",
      "transcript": "Kommt sofort!",
      "speaker_role": "CLERK_FEMALE",
      "locale": "de-DE",
      "register": "POLITE_FORMAL_SIE",
      "speaking_rate": "NATURAL_CLEAR",
      "performance_direction": "Brisk, cheerful confirmation.",
      "scene": "CAFE_COUNTER",
      "linked_activity_ids": [
        "ACT-DE-N1-E0-01"
      ],
      "replay_policy": "UNLIMITED",
      "recorded_audio_status": "NOT_RECORDED",
      "text_audio_alignment_status": "NOT_APPLICABLE_NO_RECORDED_AUDIO",
      "audio_review_status": "PENDING_AFTER_RECORDING",
      "transcript_language_review_status": "candidate_pending_human_review",
      "speaker_permission_license_requirement": "WRITTEN_TALENT_RELEASE_REQUIRED",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "audio_id": "AUD-DE-N1-004",
      "transcript": "Guten Morgen! Was darf es sein?",
      "speaker_role": "BAKER_MALE",
      "locale": "de-DE",
      "register": "POLITE_FORMAL_SIE",
      "speaking_rate": "MODERATE_CLEAR",
      "performance_direction": "Warm morning bakery service greeting.",
      "scene": "BAKERY_COUNTER",
      "linked_activity_ids": [
        "ACT-DE-N1-E3-01"
      ],
      "replay_policy": "UNLIMITED",
      "recorded_audio_status": "NOT_RECORDED",
      "text_audio_alignment_status": "NOT_APPLICABLE_NO_RECORDED_AUDIO",
      "audio_review_status": "PENDING_AFTER_RECORDING",
      "transcript_language_review_status": "candidate_pending_human_review",
      "speaker_permission_license_requirement": "WRITTEN_TALENT_RELEASE_REQUIRED",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "audio_id": "AUD-DE-N1-005",
      "transcript": "Hallo! Was möchten Sie?",
      "speaker_role": "KIOSK_CLERK_FEMALE",
      "locale": "de-DE",
      "register": "POLITE_FORMAL_SIE",
      "speaking_rate": "BRISK_NATURAL",
      "performance_direction": "Prompt, standard station kiosk greeting.",
      "scene": "STATION_KIOSK",
      "linked_activity_ids": [
        "ACT-DE-N1-E4-01"
      ],
      "replay_policy": "UNLIMITED",
      "recorded_audio_status": "NOT_RECORDED",
      "text_audio_alignment_status": "NOT_APPLICABLE_NO_RECORDED_AUDIO",
      "audio_review_status": "PENDING_AFTER_RECORDING",
      "transcript_language_review_status": "candidate_pending_human_review",
      "speaker_permission_license_requirement": "WRITTEN_TALENT_RELEASE_REQUIRED",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "audio_id": "AUD-DE-N2-001",
      "transcript": "Darf es sonst noch etwas sein?",
      "speaker_role": "CLERK_MALE_RAPID",
      "locale": "de-DE",
      "register": "POLITE_FORMAL_SIE",
      "speaking_rate": "RAPID_NATURAL",
      "performance_direction": "Authentic brisk service pace with natural connected speech, prompting realistic non-understanding without slurred caricature.",
      "scene": "CAFE_COUNTER_BREAKDOWN",
      "linked_activity_ids": [
        "ACT-DE-N2-E0-01",
        "ACT-DE-N2-E3-01"
      ],
      "replay_policy": "SINGLE_REPLAY",
      "recorded_audio_status": "NOT_RECORDED",
      "text_audio_alignment_status": "NOT_APPLICABLE_NO_RECORDED_AUDIO",
      "audio_review_status": "PENDING_AFTER_RECORDING",
      "transcript_language_review_status": "candidate_pending_human_review",
      "speaker_permission_license_requirement": "WRITTEN_TALENT_RELEASE_REQUIRED",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "audio_id": "AUD-DE-N2-002",
      "transcript": "Wie bitte?",
      "speaker_role": "CUSTOMER_FEMALE",
      "locale": "de-DE",
      "register": "POLITE_FORMAL_SIE",
      "speaking_rate": "DELIBERATE_CLEAR",
      "performance_direction": "Calm, polite, clear rising intonation repair formula.",
      "scene": "CAFE_COUNTER_REPAIR",
      "linked_activity_ids": [
        "ACT-DE-N2-E0-01",
        "ACT-DE-N2-E1-01",
        "ACT-DE-N2-E1-02",
        "ACT-DE-N2-E1-03"
      ],
      "replay_policy": "UNLIMITED",
      "recorded_audio_status": "NOT_RECORDED",
      "text_audio_alignment_status": "NOT_APPLICABLE_NO_RECORDED_AUDIO",
      "audio_review_status": "PENDING_AFTER_RECORDING",
      "transcript_language_review_status": "candidate_pending_human_review",
      "speaker_permission_license_requirement": "WRITTEN_TALENT_RELEASE_REQUIRED",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "audio_id": "AUD-DE-N2-003",
      "transcript": "Möchten Sie noch etwas?",
      "speaker_role": "CLERK_MALE_SLOWER",
      "locale": "de-DE",
      "register": "POLITE_FORMAL_SIE",
      "speaking_rate": "MODERATE_CLEAR",
      "performance_direction": "Patient, distinctly articulated cooperative rephrase.",
      "scene": "CAFE_COUNTER_RECOVERY",
      "linked_activity_ids": [
        "ACT-DE-N2-E0-01"
      ],
      "replay_policy": "UNLIMITED",
      "recorded_audio_status": "NOT_RECORDED",
      "text_audio_alignment_status": "NOT_APPLICABLE_NO_RECORDED_AUDIO",
      "audio_review_status": "PENDING_AFTER_RECORDING",
      "transcript_language_review_status": "candidate_pending_human_review",
      "speaker_permission_license_requirement": "WRITTEN_TALENT_RELEASE_REQUIRED",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "audio_id": "AUD-DE-N2-004",
      "transcript": "Nein, danke.",
      "speaker_role": "CUSTOMER_FEMALE",
      "locale": "de-DE",
      "register": "POLITE_FORMAL_SIE",
      "speaking_rate": "NATURAL_CLEAR",
      "performance_direction": "Polite negative response concluding the transaction.",
      "scene": "CAFE_COUNTER_CLOSING",
      "linked_activity_ids": [
        "ACT-DE-N2-E0-01"
      ],
      "replay_policy": "UNLIMITED",
      "recorded_audio_status": "NOT_RECORDED",
      "text_audio_alignment_status": "NOT_APPLICABLE_NO_RECORDED_AUDIO",
      "audio_review_status": "PENDING_AFTER_RECORDING",
      "transcript_language_review_status": "candidate_pending_human_review",
      "speaker_permission_license_requirement": "WRITTEN_TALENT_RELEASE_REQUIRED",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    },
    {
      "audio_id": "AUD-DE-N2-005",
      "transcript": "Möchten Sie eine Quittung?",
      "speaker_role": "KIOSK_CLERK_FEMALE",
      "locale": "de-DE",
      "register": "POLITE_FORMAL_SIE",
      "speaking_rate": "BRISK_NATURAL",
      "performance_direction": "Natural brisk query at the station kiosk.",
      "scene": "STATION_KIOSK",
      "linked_activity_ids": [
        "ACT-DE-N2-E4-01"
      ],
      "replay_policy": "SINGLE_REPLAY",
      "recorded_audio_status": "NOT_RECORDED",
      "text_audio_alignment_status": "NOT_APPLICABLE_NO_RECORDED_AUDIO",
      "audio_review_status": "PENDING_AFTER_RECORDING",
      "transcript_language_review_status": "candidate_pending_human_review",
      "speaker_permission_license_requirement": "WRITTEN_TALENT_RELEASE_REQUIRED",
      "version": "2.1.0",
      "provenance_ref": "PROV-AI-WP02R",
      "review_status": "candidate_pending_human_review"
    }
  ],
  "provenance_sources": [
    {
      "source_id": "SRC-DE-001",
      "title": "CEFR Companion Volume 2020",
      "direct_url": "https://rm.coe.int/common-european-framework-of-reference-for-languages-learning-teaching/16809ea0d4",
      "owner_or_publisher": "Council of Europe",
      "access_date": "2026-09-02",
      "claim_supported": "CEFR level framework and general descriptors only; no Pre-A1 certification claim is made for this pack.",
      "license_status": "COPYRIGHT_ALL_RIGHTS_RESERVED_REFERENCE_ONLY",
      "usage_type": "PEDAGOGICAL_REFERENCE_ONLY",
      "learner_visible_material_used": false,
      "attribution_notes": "Reference for the level ceiling; no source text is copied into learner-visible material.",
      "version": "2.1.0",
      "review_status": "candidate_pending_human_review",
      "provenance_ref": "SRC-DE-001"
    },
    {
      "source_id": "SRC-DE-002",
      "title": "Start Deutsch 1 Prüfungsziele und Testbeschreibung",
      "direct_url": "https://www.goethe.de/pro/relaunch/prf/sk/Pruefungsziele_Testbeschreibung_A1_SD1.pdf",
      "owner_or_publisher": "Goethe-Institut e.V. & telc GmbH",
      "access_date": "2026-09-02",
      "claim_supported": "General Goethe-Zertifikat A1 examination profile and everyday service interaction benchmark only; not evidence for a Pre-A1 certification or sequence.",
      "license_status": "COPYRIGHT_ALL_RIGHTS_RESERVED_REFERENCE_ONLY",
      "usage_type": "CURRICULUM_BENCHMARK_ONLY",
      "learner_visible_material_used": false,
      "attribution_notes": "No test task, recording, or learner-visible source text is copied.",
      "version": "2.1.0",
      "review_status": "candidate_pending_human_review",
      "provenance_ref": "SRC-DE-002"
    },
    {
      "source_id": "SRC-DE-003",
      "title": "Amtliches Regelwerk der deutschen Rechtschreibung — § 69",
      "direct_url": "https://grammis.ids-mannheim.de/rechtschreibung/6200",
      "owner_or_publisher": "Rat für deutsche Rechtschreibung / Leibniz-Institut für Deutsche Sprache",
      "access_date": "2026-09-02",
      "license_status": "COPYRIGHT_ALL_RIGHTS_RESERVED_REFERENCE_ONLY",
      "learner_visible_material_used": false,
      "version": "2.1.0",
      "review_status": "candidate_pending_human_review",
      "claim_supported": "The question mark marks an utterance as a question; used only for the VAR-DE-N2-02 punctuation-review question.",
      "usage_type": "ORTHOGRAPHY_SPECIFICATION",
      "attribution_notes": "Narrow §69 reference; no comma claim is drawn from this record.",
      "provenance_ref": "SRC-DE-003"
    },
    {
      "source_id": "SRC-DE-004",
      "title": "Duden — Rechtschreibung: Kaffee",
      "direct_url": "https://www.duden.de/rechtschreibung/Kaffee",
      "owner_or_publisher": "Cornelsen Verlag GmbH",
      "access_date": "2026-09-02",
      "license_status": "COPYRIGHT_ALL_RIGHTS_RESERVED_REFERENCE_ONLY",
      "learner_visible_material_used": false,
      "version": "2.1.0",
      "review_status": "candidate_pending_human_review",
      "claim_supported": "Spelling, gender, singular, and plural for the single lexical item 'Kaffee' (LEX-DE-001) only.",
      "usage_type": "LEXICOGRAPHICAL_REFERENCE_ONLY",
      "attribution_notes": "Narrow single-entry reference; no Duden wording is copied into learner-visible material.",
      "provenance_ref": "SRC-DE-004"
    },
    {
      "source_id": "SRC-DE-005",
      "title": "Duden — Rechtschreibung: Tee",
      "direct_url": "https://www.duden.de/rechtschreibung/Tee_Getraenk",
      "owner_or_publisher": "Cornelsen Verlag GmbH",
      "access_date": "2026-09-02",
      "license_status": "COPYRIGHT_ALL_RIGHTS_RESERVED_REFERENCE_ONLY",
      "learner_visible_material_used": false,
      "version": "2.1.0",
      "review_status": "candidate_pending_human_review",
      "claim_supported": "Spelling, gender, singular, and plural for the single lexical item 'Tee' (LEX-DE-002) only.",
      "usage_type": "LEXICOGRAPHICAL_REFERENCE_ONLY",
      "attribution_notes": "Narrow single-entry reference; no Duden wording is copied into learner-visible material.",
      "provenance_ref": "SRC-DE-005"
    },
    {
      "source_id": "SRC-DE-006",
      "title": "Duden — Rechtschreibung: Apfelsaft",
      "direct_url": "https://www.duden.de/rechtschreibung/Apfelsaft",
      "owner_or_publisher": "Cornelsen Verlag GmbH",
      "access_date": "2026-09-02",
      "license_status": "COPYRIGHT_ALL_RIGHTS_RESERVED_REFERENCE_ONLY",
      "learner_visible_material_used": false,
      "version": "2.1.0",
      "review_status": "candidate_pending_human_review",
      "claim_supported": "Spelling, gender, singular, and plural for the single lexical item 'Apfelsaft' (LEX-DE-003) only.",
      "usage_type": "LEXICOGRAPHICAL_REFERENCE_ONLY",
      "attribution_notes": "Narrow single-entry reference; no Duden wording is copied into learner-visible material.",
      "provenance_ref": "SRC-DE-006"
    },
    {
      "source_id": "SRC-DE-007",
      "title": "Amtliches Regelwerk der deutschen Rechtschreibung — § 72",
      "direct_url": "https://grammis.ids-mannheim.de/rechtschreibung/6202",
      "owner_or_publisher": "Rat für deutsche Rechtschreibung / Leibniz-Institut für Deutsche Sprache",
      "access_date": "2026-09-02",
      "license_status": "COPYRIGHT_ALL_RIGHTS_RESERVED_REFERENCE_ONLY",
      "learner_visible_material_used": false,
      "version": "2.1.0",
      "review_status": "candidate_pending_human_review",
      "claim_supported": "Communicative expressions such as 'bitte' may be integrated into the sentence or set off parenthetically; used only for VAR-DE-N1-02 and VAR-DE-N1-10.",
      "usage_type": "ORTHOGRAPHY_SPECIFICATION",
      "attribution_notes": "Narrow §72 reference; no question-mark claim is drawn from this record.",
      "provenance_ref": "SRC-DE-007"
    }
  ],
  "ai_provenance": {
    "provenance_id": "PROV-AI-WP02R",
    "authorship_type": "AI_GENERATED_AND_AI_REPAIRED_CANDIDATE",
    "provider": "MULTI_PROVIDER_LINEAGE",
    "model": "mixed_lineage_with_unverified_components",
    "generation_date": "2026-09-02",
    "source_brief_id": "WP02R2-GERMAN-INTEGRITY-REPAIR-V1",
    "human_review_status": "PENDING",
    "project_content_license": "PROPRIETARY_ALL_RIGHTS_RESERVED",
    "release_gate": "BLOCKED_PENDING_HUMAN_REVIEW",
    "version": "2.1.0",
    "generation_history": [
      {
        "stage": "INITIAL_GERMAN_CANDIDATE_AND_EARLY_REPAIR",
        "provider": "Google Gemini",
        "model": "unknown",
        "included_in_final": true
      },
      {
        "stage": "REJECTED_INTERMEDIATE_REDESIGN",
        "provider": "Notion AI",
        "model": "unknown",
        "included_in_final": false
      },
      {
        "stage": "WP02R2_CANONICAL_REPAIR_AND_VALIDATION",
        "provider": "OpenAI Codex",
        "model": "GPT-5 family",
        "included_in_final": true
      }
    ],
    "provenance_ref": "PROV-AI-WP02R",
    "review_status": "candidate_pending_human_review"
  }
}
```
<!-- CANONICAL_JSON_END -->
