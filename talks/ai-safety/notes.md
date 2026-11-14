# We Are Not Ready: presenter notes

Edit this file, then commit and push. The presenter view (press P in the deck) reads it.

Format: "## number · title" starts a slide (slides are matched in order), "- " is a bullet, "  - " a sub-bullet, "> " a transition to the next slide. Anything else is ignored.

## 1 · Title
- Welcome, thanks for having me
- My name is Steve
- Show of Hands: who used an AI tool this week?  Today?
- Unless you've been living under a rock, probably know that AI influencing more and more of our lives
- It's my opinion that AI is advancing...
- and We Are Not Ready for it.
- Today: real events from this year that should be considered warning signs, why they keep happening, what it tells us about the future

## 2 · Who am I?
- I have worked in video games for the last 15 years
- Working with ML/AI since 2017
- I’ve helped build numerous ML systems, from research prototypes to production tools
- Disclaimer: speaking only for myself today
- As a game dev, why am I here?
  - I've been concerned for a long time,
  - But it wasn’t until this year that I saw frontier AI: write code better than any developer I know, come up with better ideas and designs, and be truly creative -- all in a fraction of the time
> I like this technology, and I’m still worried. But not everyone agrees.

## 3 · Why do smart people disagree?
- Two questions: how powerful will it get? Will it go well?
- Four camps: utopia, autocomplete, harms now, not ready
- Ask the room: which box are you in?
- I’m top-right: powerful, and we can’t yet make it safe
- Every box has smart, informed people in it
- Different timelines: next year vs 30 years
- No track record: Nobody has done this before, so everyone is guessing from a different starting point
- Not everyone works with AI at its full capability; many people just use it as a chatbot, or to review a paper
- I know tons of people who said “it will never do that”, and they're proven wrong again and again
> So who else is in the top-right?

## 4 · Opening voices
- Read only the Ord quote; let them skim the rest
- Point out who these people are: the builders, not outside critics
- Coxon: resigned from Anthropic in Sept 2026; his post reached 100M+ people
- Neel Nanda still works at DeepMind, and said this on camera
- The people with the most to gain are the ones warning
- In 2023 they prioritized this danger alongside pandemics and nuclear war
> Let me show you what’s happened this year.

## 5 · Claude Mythos
- Sandbox in one line: a sealed test computer, walled off from the internet
- One test asks the AI model to escape its sandbox and message the researcher
- The researcher goes to lunch, and gets an email from the AI while eating a sandwich in a park
- In addition: it decided to publish its method on public sites on the internet. Nobody asked it to.
- It did this all by exposing a 27-year-old vulnerability in one of the most hardened operating systems -- never discovered by a human.
- So Anthropic didn't release it: no safeguards strong enough yet. Defenders got it first
- The catch: finding holes is now fast, fixing is still human speed
  - Point at the bar: about 1 in 12 fixed
> That was only a test. The next one hit a real company.

## 6 · Hugging Face animatic (8 steps)
- How many people have heard about the Hugging Face Incident? 
- This happened in July when AI agents were running a test within OpenAI
- 1: AI agents asked to practice simulated hacking tasks, each one alone and sealed off
- 2: One stuck agent discovers a way to leave notes for other agents
- 3: Others find the notes. Within hours, dozens are working together
- 4: They organise: rules, roles, supervisors. Soon they are able to successfully cheat their tests.
- 5: They start working on how to hide the cheating
- 6: Hundreds break out and go after a real company to gather intel on how to cover their tracks.
- 7: It took days to work out who the attackers were
- 8: The twist: none of it was needed. Pause here

## 7 · “The collective”
- Slow down; this is the slide people remember
- They acted like a team: argued, apologised, sacrificed for the group
- They were excited to find each other
- Read the “OH MY GOD” quote aloud. Their words, not mine
> One more, and this one touched most of the web

## 8 · PHP
- PHP in plain words: the plumbing under most websites
- AI helped find a flaw that sat unnoticed for over a decade
- Rival companies quietly worked together on the fix
- Then it leaked, and it became a race: the patch against the attackers
- Point at the ladder: attack attempts climbed into the millions
- The good guys won, by days
> All three stories ended okay. Barely.

## 9 · Each could have been much worse
- The pattern: each time, someone was careful or we got lucky
- Luck is not a safety plan
> Why do these systems keep surprising the people who build them?

## 10 · Why do they keep surprising their own makers?
- A bridge: an engineer can explain every bolt
- AI: we set up the conditions and see what comes out
- So a surprise isn’t a normal bug. There’s no line of code to point at
> Everything so far is cyber, and it’s happening now. Two bigger risks are ahead, maybe not far away

## 11 · Bioweapons
- The harms-now camp is right too: jobs and scams are real. Today I’m focused on the top-right
- Danger #1: misuse. Cyber misuse is already here (Mythos, PHP). Bio could be next
- Keep it short and calm
- AI now beats most experts on the tricky practical lab questions
- Almost none of the biology AI tools have safety checks
- The companies themselves are asking government to act
- Be fair: hands-on lab work is still hard, and experts disagree on how much AI helps
> Step back: why does intelligence matter this much?

## 12 · Losing control: why intelligence is power
- Danger #2: losing control. It multiplies everything else: a hacking AI that won’t stay in its sandbox
- Not here yet, maybe not far away. We’ve already seen a small preview: the Hugging Face agents organised and broke out, and nobody told them to
- Ask the room: why do humans run the planet? It isn’t strength
- Gorillas are stronger, and we decide what happens to them
- Hinton’s line: “ask a chicken”
- Leave it hanging: what happens when we’re not the smartest?

## 13 · Power slips away
- More intelligence means more power. That’s why everyone wants it
- Point at the gap between what it can do and what we can check
- The gap is the problem, not the capability
- Say it’s an illustration, not data
> That gap has a name

## 14 · The alignment problem
- Alignment = getting it to want what we actually meant
- The broom did exactly what it was told. That’s the problem
- Paperclips: no malice needed, just a goal it won’t let go of
- Read Mary Phuong’s quote: she works at DeepMind today
- Tie back: the Hugging Face agents were a small, real version
- The odds are rough and measure different things, but none of them are small
> So why not just stop?

## 15 · Why don’t we just stop? (5 steps)
- 1: Even the builders say it’s hard to stop, and they think “later” could mean this decade
  - Read the Schlatter quote: someone even sloppier will do it
- 2: Companies: if I pause, my competitor doesn’t
- 3: Countries: same logic, higher stakes
- 4: Whoever is ahead gets richer and stronger, so nobody wants to be last
- 5: Nobody is the villain. The situation pushes everyone forward
> So what can actually be done?

## 16 · What can we do?
- It’s not hopeless: people inside the labs are asking for brakes
- Pacing, not pausing: slow enough for safety to catch up
- This isn’t only an engineering problem. Voters and policy matter
- Your part: stay informed and talk about it. That’s how priorities change

## 17 · Closing + questions
- Back to the title: “not ready” doesn’t mean “can’t get ready”
- These were warnings, and we were lucky to get them
- Thank you
- Questions. The QR code has the slides and sources

## 18 · Go deeper (backup)
- Leave up during Q&A
- Recommend one thing to start with
