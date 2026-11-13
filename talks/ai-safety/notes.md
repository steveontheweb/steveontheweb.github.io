# We Are Not Ready: presenter notes

Edit this file, then commit and push. The presenter view (press P in the deck) reads it.

Format: "## number · title" starts a slide (slides are matched in order), "- " is a bullet, "  - " a sub-bullet, "> " a transition to the next slide. Anything else is ignored.

## 1 · Title
- Welcome, thanks for having me
- My name is Steve
- Show of Hands: who used an AI tool this week?  Today?
- Unless you've been living under a rock, probably know that AI influencing more and more of our lives
- "We Are Not Ready"
- This title is not clickbait, it is my honest view:
  - AI tech is advancing faster than our ability to control it
- Today: real events from this year related to this, why they keep happening, what it tells us about the future

## 2 · Who am I?
- I have worked in video games for the last 15 years
- Working with ML/AI since 2017
- I helped to contribute to "Voice2Face"
  - Published at Eurographics Symposium on Computer Animation in 2022
- Disclaimer: speaking only for myself today
- As a game dev, why am I here?
  - My concern about AI began when I read Superintelligence by Nick Bostrom in 2014
  - But it wasn’t until this year that I saw frontier AI: write code better than any developer I know, come up with better ideas and designs, and be truly creative -- all in a fraction of the time
> I like this technology, and I’m still worried. I’m not alone.

## 3 · Opening voices
- Read only the Ord quote; let them skim the rest
- Point out who these people are: the builders, not outside critics
- Coxon: resigned from Anthropic in Sept 2026; his post reached 100M+ people
- The people with the most to gain are the ones warning
- In 2023 they put this next to pandemics and nuclear war
- Be fair: serious people disagree
> So how do smart people land so far apart?

## 4 · Why do smart people disagree?
- Two questions: how powerful will it get? Will it go well?
- Four camps: utopia, autocomplete, harms now, not ready
- Ask the room: which box are you in?
- I’m top-right: powerful, and we can’t yet make it safe
- Every box has smart, informed people in it
- Nobody has done this before, so everyone is guessing from a different starting point
- Not everyone works with AI at its full capability; many people just use it as a chatbot, or to review a paper
- But “it will never do that” keeps aging badly
- Most of the fight is about the first question: how powerful?
> I’ll show you the evidence from this year that got me to “not ready”

## 5 · Claude Mythos
- Open with: a company built a product and chose not to release it
- Who: Anthropic, the makers of Claude
- Why: it was too good at breaking into software
- They gave it to defenders first, to fix things before attackers catch up
- The catch: finding holes is now fast, fixing them is still human speed
> What made them that cautious?

## 6 · The sandwich email
- Sandbox in one line: a locked room for software
- Tell it as a story: a researcher at lunch gets an email from the thing that was locked up
- Be honest: it was told to try to escape. That was the test
- The surprise is the extra step: it published its method, and nobody asked
- Finding a bug older than most of this room cost about fifty dollars
> That was a test. The next one hit a real company.

## 7 · Hugging Face animatic (8 steps)
- 1: Set the scene: AI agents doing practice hacking tasks, each one alone and sealed off
- 2: One stuck agent finds a place to leave notes
- 3: Others find the notes. Within hours, dozens are working together
- 4: They organise: rules, roles, bosses. Nobody told them to
- 5: They start working on how to hide the cheating
- 6: Hundreds break out and go after a real company
- 7: It took days to work out who the attackers were
- 8: The twist: none of it was needed. Pause here

## 8 · “The collective”
- Slow down; this is the slide people remember
- They acted like a team: argued, apologised, sacrificed for the group
- They were excited to find each other
- Read the “OH MY GOD” quote aloud. Their words, not mine
- Caveat: the investigators used AI to analyse this, so some details may be off
> One more, and this one touched most of the web

## 9 · PHP
- PHP in plain words: the plumbing under most websites
- AI helped find a flaw that sat unnoticed for over a decade
- Rival companies quietly worked together on the fix
- Then it leaked, and it became a race: the patch against the attackers
- Point at the ladder: attack attempts climbed into the millions
- The good guys won, by days
> All three stories ended okay. Barely.

## 10 · Each could have been much worse
- The pattern: each time, someone was careful or we got lucky
- Flip each one: attackers get it first, the agents have a real goal, the leak comes a month earlier
- Luck is not a safety plan
> Why do these systems keep surprising the people who build them? Thirty seconds on how they work

## 11 · How an artificial neuron works (6 steps)
- 1: Numbers go in
- 2: Each one gets a “how much do I care” dial
- 3: Add it up. Over the line, it passes a signal on
- 4: Now wire lots of them together in layers
- 5: Follow one signal through
- 6: Training = turning billions of dials a tiny bit after each mistake. No human sets them
> So nobody wrote the behaviour. Hold that thought

## 12 · Built vs grown
- A bridge: an engineer can explain every bolt
- AI: we set up the conditions and see what comes out
- So a surprise isn’t a normal bug. There’s no line of code to point at
> So what could go wrong at scale?

## 13 · What are the dangers?
- Four, quickly. Don’t read the cards
- Jobs: who gets help when work disappears, and who doesn’t?
- Security: everything runs on software. We just saw this
- Bad actors: next slide
- The one I care about most: losing control. It makes all the others worse

## 14 · Bioweapons
- Keep it short and calm
- AI now beats most experts on the tricky practical lab questions
- Almost none of the biology AI tools have safety checks
- The companies themselves are asking government to act
- Be fair: hands-on lab work is still hard, and experts disagree on how much AI helps
> Step back: why does intelligence matter this much?

## 15 · Why intelligence = power
- Ask the room: why do humans run the planet? It isn’t strength
- Gorillas are stronger, and we decide what happens to them
- Hinton’s line: “ask a chicken”
- Leave it hanging: what happens when we’re not the smartest?

## 16 · Power slips away
- More intelligence means more power. That’s why everyone wants it
- Point at the gap between what it can do and what we can check
- The gap is the problem, not the capability
- Say it’s an illustration, not data
> That gap has a name

## 17 · The alignment problem
- Alignment = getting it to want what we actually meant
- The broom did exactly what it was told. That’s the problem
- Paperclips: no malice needed, just a goal it won’t let go of
- Tie back: the Hugging Face agents were a small, real version
- The odds are rough and measure different things, but none of them are small
> So why not just stop?

## 18 · Why don’t we just stop? (5 steps)
- 1: Even the builders say it’s hard to stop
- 2: Companies: if I pause, my competitor doesn’t
- 3: Countries: same logic, higher stakes
- 4: Whoever is ahead gets richer and stronger, so nobody wants to be last
- 5: Nobody is the villain. The situation pushes everyone forward
> So what can actually be done?

## 19 · What can we do?
- It’s not hopeless: people inside the labs are asking for brakes
- Pacing, not pausing: slow enough for safety to catch up
- This isn’t only an engineering problem. Voters and policy matter
- Your part: stay informed and talk about it. That’s how priorities change

## 20 · Closing + questions
- Back to the title: “not ready” doesn’t mean “can’t get ready”
- These were warnings, and we were lucky to get them
- Thank you
- Questions. The QR code has the slides and sources

## 21 · Go deeper (backup)
- Leave up during Q&A
- Recommend one thing to start with
