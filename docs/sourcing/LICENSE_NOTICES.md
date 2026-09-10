# Living Language Atlas — Third-Party Sourcing & License Notices

This document details the open source licenses, attributions, and dual-boundary terms governing third-party libraries, fonts, and frameworks integrated into the Living Language Atlas codebase.

---

## 1. Dual-Boundary Architecture & Ownership Separation

Living Language Atlas maintains a strict boundary separating proprietary application intellectual property from permissively licensed open-source infrastructure:

### A. Living Language Atlas Proprietary Core (All Rights Reserved)
- **Scope**: All original application logic, evaluation engines, state machines, content readers, and learning event ledger systems (e.g., `src/content_reader.js`, `src/evaluator_engine.js`, `src/learning_event_contract.js`, `src/in_memory_learning_event_ledger.js`).
- **Copyright**: © 2026 EthemKD. All rights reserved.
- **License Terms**: Proprietary and confidential. Unauthorized copying, reverse engineering, redistribution, modification, or public display is strictly prohibited.

### B. Pedagogical Curriculum & Candidate Content Packs (Proprietary / All Rights Reserved)
- **Scope**: All learning content, activities, rubrics, linguistic metadata, audio references, and candidate curriculum packs located in `outputs/` (including `living_language_atlas_wp02_german_content_pack_v2_1_candidate.json` and associated schemas).
- **Copyright**: © 2026 EthemKD. All rights reserved.
- **Status**: `PROPRIETARY_ALL_RIGHTS_RESERVED` / `BLOCKED_PENDING_HUMAN_REVIEW`.
- **Restrictions**: Commercial or public distribution, training of external machine learning models without authorization, and reproduction are strictly prohibited.

### C. Open Source Foundation & Libraries (Third-Party Notices Below)
The application infrastructure, user interface styling, icons, and typography utilize third-party components under MIT, ISC, and OFL-1.1 licenses as enumerated below.

---

## 2. SIL Open Font License 1.1 (OFL-1.1)

### Noto Sans
- **Package**: `@expo-google-fonts/noto-sans`
- **Copyright**: Copyright 2022 The Noto Project Authors (https://github.com/notofonts/latin-greek-cyrillic)
- **License**: SIL Open Font License, Version 1.1 (OFL-1.1)
- **Scope**: Typography font files providing comprehensive Latin and Cyrillic glyph support. Font software is bundled and loaded at runtime via `expo-font` without embedding proprietary application code inside font binaries.
- **License Text Summary**:
  Permission is hereby granted, free of charge, to any person obtaining a copy of the Font Software, to use, study, copy, merge, embed, modify, redistribute, and sell modified and unmodified copies of the Font Software, subject to the conditions that the Font Software is not sold by itself, and that bundled distributions retain the copyright notice and OFL-1.1 license terms.

---

## 3. MIT License Notices

The following libraries and tools are used under the terms of the MIT License:

### A. Expo & React Native Frameworks
- **Packages**: `expo`, `expo-router`, `expo-font`, `react-native`, `react`, `react-dom`, `@expo/ui`
- **Copyright**:
  - Copyright (c) 650 Industries, Inc. (Expo)
  - Copyright (c) Meta Platforms, Inc. and affiliates (React Native / React)
- **Permission**: Granted free of charge to deal in the Software without restriction, subject to retaining copyright and permission notices.

### B. Lucide Icons & React Native SVG
- **Packages**: `lucide-react-native`, `react-native-svg`
- **Copyright**:
  - Copyright (c) 2022 Lucide Contributors (https://lucide.dev)
  - Copyright (c) 2015-present Horcrux (react-native-svg)
- **Permission**: Granted under the standard MIT License.

### C. NativeWind & Tailwind CSS
- **Packages**: `nativewind`, `tailwindcss`, `react-native-css-interop`
- **Copyright**:
  - Copyright (c) Mark Lawlor (NativeWind / React Native CSS Interop)
  - Copyright (c) Tailwind Labs, Inc. (Tailwind CSS)
- **Permission**: Granted under the standard MIT License.

### D. gluestack-ui v2 Primitives
- **Scope**: Headless and copy-paste component patterns adapted manually in `src/components/ui/`
- **Copyright**: Copyright (c) GeekyAnts India Pvt. Ltd.
- **Permission**: MIT License.

---

## 4. ISC License Notices

Certain transitive and development utility dependencies (such as `semver`) operate under the ISC license:
- **Permission**: Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

---

## 5. Compliance Verification & Audit Checklist

- [x] Third-party fonts are linked/loaded via standard font loaders without altering font headers or embedding proprietary logic.
- [x] All copy-paste components (`src/components/ui/button.tsx`) maintain clear attribution and clean separation from proprietary engines.
- [x] Package manifests (`package.json`, `package-lock.json`) maintain auditable source registry origins and exact semver specifications.
- [x] Proprietary core engine headers explicitly declare All Rights Reserved terms.
