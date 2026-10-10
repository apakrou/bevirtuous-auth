# BeVirtuous email links

Public static page used by Supabase confirmation and password recovery emails.
It carries a validated, single-use token hash in the URL fragment into the
installed app only after the user taps **Open BeVirtuous**.

No API keys, account data, dependencies, analytics, backend calls, cookies, or
browser storage are used. Tokens are never verified by this page.

Keep these files synchronized with the dedicated `apakrou/bevirtuous-auth`
repository, served by GitHub Pages from `main` at `/`. Do not publish the mobile
app repository to Pages. Template sources and rollout notes live in the private
app workspace under `docs/security/`.
