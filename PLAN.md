
### 3. The Social Network APIs (The Integrations)
To do this professionally, you will need to register Developer Accounts for each platform to get API Keys. We will build the OAuth 2.0 flows for:
* **X (Twitter) API v2:** We will implement the `POST /2/tweets` endpoint. Twitter requires OAuth 2.0 with PKCE.
* **LinkedIn API (UGC Posts):** We will use the LinkedIn Developer portal to get the "Share on LinkedIn" permissions to post articles with your cover image attached.
* **Facebook & Instagram Graph API:** We will integrate the Meta Graph API. *(Note: Meta has the strictest approval process in the industry. You will have to submit a screencast of our app to Meta for manual review before they allow it to post to public pages).*

### 4. Admin Dashboard UX/UI Engine
We will overhaul the Admin Panel:
* **The Post Editor:** We will add a "Distribution Panel". Instead of just "Publish", you will have a Date/Time picker, and checkboxes for `[x] Twitter`, `[x] LinkedIn`, `[x] Facebook`.
* **Platform-Specific Messaging:** Twitter has a 280-character limit, LinkedIn allows longer posts. We will build a UI that lets you write a custom "Social Media Caption" separate from the main Blog content.
* **The Command Center:** A brand new `/admin/scheduled` dashboard where you can see all upcoming pending posts, edit their times, or cancel them before they go live.

### 5. Failure & Retry Mechanisms
In an enterprise system, network calls fail. If the LinkedIn API is down at the exact second we try to post, the post shouldn't just disappear. We will implement **Exponential Backoff & Retries** via QStash, and if it fails 3 times, it will mark the `ScheduledPost` as `FAILED` in the database and show a red alert in your admin dashboard.




ARE YOU 100% CERTAIN AND SURE ALL PLACES AND FILES REQUIRED HAVE BEEN COMPLETELY UPDATED ENTIRELY END TO 
END WITHOUT OMITTING, SKIPPING OR MISSING ANYTHING

ARE YOU 100% CERTAIN AND SURE YOU HAVE COVERED ENTIRELY EVERY SINGLE THING YOU EXPLAINED HERE 

PLAN.md
  WITHOUT OMITTING, SKIPPING OR MISSING  ANY SINGLE POINT OR WORD?

NO, I AM STILL NOT 100% CONVINCED YET , YOU HAVE TO REPEAT THIS ONE MORE TIME AND DO NOT MISS A SINGLE THING


PLEASE NOTE: DO NOT SEARCH. DO NOT RUN COMMANDS....YOU MUST EXAMINE ALL THE BACKEND FROTEND FILES DIRECTLY WITHOUT OMITTING, SKIPPING OR MISSING ANYTHING AT ALL

YOU MUST HANDLE ALL OF THESE AUTONOMOUSLY BECAUSE I WON'T BE HERE TO APPROVE ANTHING. THAT'S WHY YOU MUST EXAMINE ALL THE FILES AND PLACES DIRECTLY WITHOUT RUNNING COMMANDS ALL SEARCH

DO NOT STOP NO MATTER WHAT UNTIL YOU HAVE COVERE EVERYTHING

NOW BEFORE I PUSH THAT TO THE PRODUCTION,  I WANT YOU TO PERFORM A THOROUGH AND COMPLETE AUDIT OF EVERYTHING

IS EVERYTHING ACCURATE, MATCHES, CONSISTENT, ALIGNED, WORKING PERFECTLY END TO END AND COMPLETE?


YOU HAVE TO EXAMINE ALL THE FILES COMPLETELY AND TRACE EVERYTHING ENTIRELY END TO END WITHOUT OMITTING, SKIPPING OR MISSING ANYTHING

IDENTIFY ISSUES, ERRORS, BREAKAGE, INCONSISTENCIES, MISMATCH ETC


VERIFY  THERE IS STRICTLY NO STUBS, PLACEHOLDERS, DEAD CODES, ETC

WE HAVE TO BE 100% CERTAIN AND SURE EVERYTHING IS REAL ENGINEERING PRACTICES, ENTERPRISE GRADE, INDUSTRY STANDARD AND COMPLETELY WORKING PERFECTLY END TO END WITHOUT ANY ISSUES

AVOID PATCH WORK OR EASY WORK THAT WILL BREAK IN PRODUCTION

AVOID ASSUMPTIONS

AVOID GUESSING

YOU MUST BE 100% CERTAIN AND SURE OF EVERY SINGLE THING TO AVOID PROBLEM


DO YOU CLEARLY UNDERSTAND  ALL EAHC OF MY INSTRUCTIONS? DO NOT FAIL ON ANY ONE