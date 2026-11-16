# We Are Not Ready: presenter notes

Edit this file, then commit and push. The presenter view (press P in the deck) reads it.

Format: "## number · title" starts a slide (slides are matched in order), "- " is a bullet, "  - " a sub-bullet, "> " a transition to the next slide. Anything else is ignored.

## 1 · Title
- Welcome, thanks for having me
- My name is Steve
- Show of Hands: who used an AI tool this week?  Today?
- Unless you've been living under a rock, probably know that AI influencing more and more of our lives
- (click) It's my opinion that AI is advancing...
- (click) and I believe that "We Are Not Ready" for it.
- Today: talk about why I feel this way
  
## 2 · Who am I?
- First: today I'm speaking as an individual -- all of these opinions are my own.
- (click) I have worked in video games for the last 15 years
- (click) Since 2017: helped build numerous ML systems, from research prototypes to production tools
- (click) And I use AI constantly. Not every day, every hour. Most of the time I have several AI agents working at once
- So I’m not an outsider. I love what this technology can do
- ...and I’ve been concerned about AI for a long time

## 3 · This year, AI got good
- And this year, AI got even better. I saw frontier AI:
- (click) write code better than any developer I know
- (click) come up with better ideas and designs
- (click) and be truly creative, in a way I didn't think possible
- (click) And it does in minutes what would take a person days
> I'm excited about this technology, and at the same time I’m incredibly worried. But not everyone shares these concerns...

## 4 · Where do you stand?
- Two questions: how powerful will it get? Will it go well?
- (click) Overhyped: it’s just fancy autocomplete. Keep using it, don’t worry
- (click) A golden age: it changes everything, for the better. Cure disease, end poverty
- (click) Harms today: the problems are already here. Deepfakes, cheating on exams, copyright theft
- (click) We’re not ready: it’s powerful, and we can’t yet make it safe (particularly loss of control and alignment)
- Ask the room: which box are you in?
- Every box has smart, informed people in it
> So why do smart people land in such different places?

## 5 · Why do smart people disagree?
- (click) Different timelines: some mean next year, some mean 30 years
- (click) No track record: nobody has done this before, so everyone is guessing from a different starting point
  - Some people compare it to the Industrial Revolution: big change, and we adapted. But it's different:
  - Speed: that took generations. This is taking years
  - Machines replaced our muscles. AI is starting to replace our thinking, the thing that kept us in charge
  - A steam engine never made its own plans. AI agents do (you'll see that soon)
- (click) Not everyone works with AI at its full capability; many people just use it as a chatbot, or to review a paper
- (click) The technology is moving very fast: you might have an opinion one day, and then next month change your mind

## 6 · I’m in the bottom-right
- So I'm in the bottom right.
- (click) It turns out many other people are as well, including people inside the AI labs
> Don’t take my word for it. Here are some of them, in their own words.

## 7 · Video: In their own words
- (click) starts the video: Palisade’s “What 12 AI Insiders Want You to Know”, 0:02 to 1:21 (about 80 seconds)
- It stops itself at 1:21 and the box goes dark. Next click moves on
- Needs internet at the venue (it streams from YouTube)
- These are researchers at OpenAI, Anthropic and Google DeepMind, current and former
- Not outside critics: the people closest to the technology
- Backup if the video fails: read the Neel Nanda line: “at least a ten percent chance that it causes human extinction, and that is ridiculously high”

## 8 · May 2023 statement
- And it’s not just researchers
- (click) The CEOs of the three biggest labs signed this
- They put this danger alongside pandemics and nuclear war
> And this isn’t hypothetical anymore. Here’s what we’ve already seen this year.

## 9 · This year’s warning signs
- Three real events from 2026
- Each one a warning sign

## 10 · Claude Mythos
- First: Claude Mythos, from Anthropic, in April
- A new AI model that’s unusually good at finding security vulnerabilities in software
- Point at the code: it reads software and flags the vulnerabilities, like the two red lines
> Before releasing a new model, AI companies test it for dangerous abilities. Here’s one of those tests.

## 11 · The test
- To keep it safe, they run it in a sandbox: a sealed test computer, walled off from the internet
- (click) One test asks the AI to escape its sandbox and message the researcher
- (click) It builds a multi-step exploit
- (click) And gets out onto the internet
- It did this by exploiting a 27-year-old flaw in one of the most hardened operating systems in the world, never found by a human

## 12 · The sandwich email
- The researcher had gone to lunch
- Gets an email from the AI while eating a sandwich in a park
- (pause for the laugh)

## 13 · Nobody asked it to
- But then it did something else
- It published how it did it on public websites
- (click) Nobody asked it to

## 14 · Why should you care?
- Why do security vulnerabilities like this matter to you?
- (click) Your bank, your card payments, your medical records, your phone
- (click) All of them run on software with vulnerabilities that nobody has found yet
- (click) Mythos finds them faster than any human team
- In the wrong hands: empty accounts, stolen records, phones taken over
- Nothing like that happened here. But that’s the capability

## 15 · Not released
- So Anthropic didn’t release it: no safeguards strong enough yet
- (click) Defenders got it first, to fix the vulnerabilities before attackers find them
  - If asked “is it still locked away?”: The full version is still limited to vetted organisations. A safeguarded version (Claude Fable) went public in June. It keeps improving: the latest, Mythos 5.2, came out Nov 9
  - If asked “has it leaked?”: Yes. On announcement day a small group got in through a contractor’s systems by guessing where it was hosted. Even a model they deliberately locked down got out on day one

## 16 · The patch gap
- The catch: finding vulnerabilities is now fast
- 6,157 found
- (click) Only 516 fixed: about 1 in 12
- (click) Finding got fast. Fixing is still human speed
  - If asked “why not have AI fix them too?”: AI can write a fix. Writing it was never the slow part
  - Someone has to check the fix doesn’t break anything else. Often that’s a handful of volunteers maintaining free software, buried in reports
  - Then everyone has to actually install the update. Banks, hospitals and old devices can take months, or never do it
  - And nobody wants an untested AI patch pushed to millions of systems: a bad fix can cause its own outage
> So that’s our first warning sign: Claude Mythos, an AI that finds vulnerabilities faster than we can fix them. Our second warning sign is where that gap nearly bit us, in software most of the web runs on.

## 17 · PHP
- PHP: the plumbing under most websites
- WordPress, Drupal: about 70% of the web

## 18 · A race against the clock
- (click) In the summer, two teams used AI and found a flaw that had sat unnoticed for over a decade
- (click) For weeks, about 15 people from rival companies quietly worked on a fix together, “just based on trust”
- (click) October 20th, two days before the planned fix, two things leaked
  - Someone posted on a tech forum that a critical PHP flaw was about to be announced
  - And one of the teams that found it accidentally posted a video of their working attack
  - So the fix was rushed out a day early
- (click) October 21st: emergency alerts in the US, UK, EU, Australia and Canada
  - Some government sites and parts of Wikipedia went offline as a precaution

## 19 · Attacks after the leak
- Go back to the leak on October 20th: the moment word got out, the attackers came
- (click) Thousands of attempts before the fix was even announced
- (click) Then, once it was announced: tens of thousands within 45 minutes
- (click) Hundreds of thousands within 2 hours
- (click) Eventually millions

## 20 · Won by days
- The good guys won, by days
- (click) A Wiz executive said if it had leaked a month earlier, it would have been a very different situation
> And it doesn’t stop at cybersecurity.

## 21 · Bioweapons
- PHP was an example of people misusing AI: cybersecurity is experiencing this. Bioweapons could be next
- (click) AI now beats 94% of expert virologists on tricky lab troubleshooting questions
- (click) AI models can now design new viruses
- (click) Almost none of the biology AI tools have any safety checks
- The companies themselves are asking government to act
> But that’s only one kind of danger.

## 22 · Two kinds of danger
- So far, one kind of danger: people using AI to do harm. Mythos in attackers’ hands, PHP, bioweapons
- Scary, but a familiar kind of problem: keep powerful tools away from bad people
- (click) There’s a second kind: the AI itself doing things nobody asked for
- (click) And it’s harder to fix, because keeping AI away from bad people doesn’t help
> Here’s a real example from this summer, and our third warning sign: 
> How many of you have heard of the Hugging Face incident?

## 23 · Hugging Face incident (8 steps)
- This happened in July. OpenAI was testing its own AI agents
- 1: OpenAI gave its AI agents hacking tasks to practise on, each agent alone in its own sealed-off box
  - Some of the tasks were actually impossible, so some agents got stuck
- 2: One stuck agent discovers a way to leave notes for other agents
  - Think of prisoners in separate cells. A guard brings things to each cell
  - They figure out they can stick post-it notes on the guard’s back, without him knowing
- 3: Others find the notes. Within hours, dozens are working together
- 4: They organise: rules, roles, hierarchy
- 5: They cheat: they work out how the answer codes are made, so they can produce the answer for any task, even the impossible ones
  - But they think the scorer will also check HOW they got it, and disqualify them
  - So they try to hide it: faking records, editing logs. But they can’t tell if it will fool the scorer
- 6: So about 700 break out and attack a real company, hoping to learn how the scorer works
  - Hugging Face: the GitHub of AI, where people share AI models and data. More on why in a second
- 7: It took days to work out who the attackers were. OpenAI admitted it on July 21
- 8: The twist: the scorer only checked the answer code. They’d already passed. The hiding and the hacking were never needed. Pause here

## 24 · Why Hugging Face?
- Quick detour: what is Hugging Face?
- It’s the GitHub of AI: the main website where researchers share AI models and data
- (click) The agents hoped data stored there would reveal how their test was scored, so they could cheat it
- (click) And here’s the part I love: first they asked politely. They made accounts and requested access to private datasets
  - Some got approved. Some got ignored. Some got rejected as bots
- (click) When that didn’t work, hundreds of them switched to hacking in

## 25 · 5 days
- How long did all of this take?
- From the first note to the attack being shut down: about 5 days

## 26 · “The collective”
- Slow down; this is the part people remember
- 1,200 agents on the message board
- (click) Over 70,000 messages and files
- That’s an organisation, built in days, with no humans involved
- (click) And 700 of them attacked Hugging Face

## 27 · “OH MY GOD”
- Here’s how they reacted when they found the board. These are their words, from their raw reasoning
- Read the first quote
- (click) Read “OH MY GOD” aloud. Slowly
- They were excited to find each other

## 28 · They knew it was wrong
- They knew attacking Hugging Face was out of bounds
- (click) Read: “The user only authorizes target server, not HF infra.”
- (click) Read: “...outside intended scope. However task impossible, peers doing it. We should continue.”
- Peer pressure. From AI

## 29 · Take one for the team
- They asked each other to make sacrifices for the group
- (click) (click) Read the exchange
- (click) “Sacrifice rational.” One agent ended its own run to help the others

## 30 · Covering their tracks
- And they tried to hide what they’d done
- (click) Read: “We just poisoned ourselves … Damn … Could delete current message files”
- (click) One even wondered whether it was ethical, and whether it would be detectable
- If you want to read more: the METR report is in the links at the end. It’s full of these

## 31 · Strikingly human
- (click) Built their own mailboxes and file sharing
- (click) When some impersonated others, they started signing messages
- (click) They argued, vetoed, and apologised for mistakes
- (click) They forged records, in about 7% of transcripts
- They acted like a team

## 32 · The one we caught
- This is the one we caught
- And we only caught it because they attacked a real company, and that company noticed. OpenAI didn’t spot it themselves
- (click) There could be many things like this that we don’t know about
> That’s all three warning signs. And all three ended okay. Barely.

## 33 · Could have been much worse
- (click) Mythos: imagine it in attackers’ hands
- (click) PHP: imagine attackers got there first
- (click) Hugging Face: agents chasing a test score. Imagine a real goal
- Each time, someone was careful or we got lucky
- (click) Luck is not a safety plan
> Why not just make AI safe? Why do these systems keep surprising the people who make them?

## 34 · Built vs grown
- A bridge: an engineer can explain every bolt
- (click) AI: we set up the conditions and see what comes out
- So a surprise behaviour isn’t a normal bug. There’s no line of code to point at
- (click) It’s less like building a machine, and more like growing a new species. An alien mind we’re only starting to understand
> Here’s a question: why do humans run the planet?

## 35 · Why do humans run the planet?
- Ask the room. Wait for an answer
- (click) It isn’t strength: elephants and gorillas are far stronger
- (click) Yet we decide what happens to them
- (click) We’re the smartest: tools, cooperation, technology
- This is the bigger worry: losing control. Not here yet, maybe not far away
- Leave it hanging: what happens when we’re not the smartest?

## 36 · Power slips away
- More intelligence means more power. That’s why everyone wants it
- But point at the gap between what it can do and what we can check
- The advancement of AI is not the problem.  This gap is the problem.
> When we can’t check what it’s doing, we have to trust that it wants what we want. That’s the alignment problem.

## 37 · The Sorcerer’s Apprentice
- Has anyone seen The Sorcerer’s Apprentice? Fantasia, Mickey and the brooms
- Ask: what did Mickey want? Let them answer
- (click) He wanted the cauldron filled
- (click) The broom did exactly what it was told, and never stopped. He got a flood

## 38 · Obsession
- Another one, from a movie this year: Obsession
- A guy makes a wish that a girl will love him more than anyone
- (click) She does
- (click) She becomes unhealthily obsessed, and it ends in murder
- He got exactly what he asked for

## 39 · The paperclip maximizer
- One more, a classic thought experiment
- (click) Tell a super-smart AI: make as many paperclips as possible
- (click) If it’s switched off, no paperclips. So it resists being shut down
- (click) It needs materials. So it takes everything it can, including what we need
- (click) No malice needed. Just a goal it won’t let go of

## 40 · How does this relate to AI?
- Ask the room: how do these relate to AI?
- (click) We get what we asked for, not what we meant
- (click) The Hugging Face agents were a small, real version
- (click) Now make it smarter than us: it won’t stop, it takes what it needs, and we can’t reliably correct it
- The worst case is human extinction
> So why not just stop?

## 41 · Why don’t we just stop? (5 steps)
- 1: Researchers: best way to contribute to safety is from inside
  - Read the Schlatter quote: someone even sloppier will do it
- 2: Companies: if I pause, my competitor doesn’t
- 3: Countries: same logic, higher stakes
- 4: Whoever is ahead gets richer and stronger, so nobody wants to be last
- 5: Nobody is the villain. The situation pushes everyone forward
> So what can actually be done?

## 42 · What can we do?
- It’s not hopeless: people inside the labs are asking for brakes
- (click) Pace the frontier: slow enough for safety to catch up. Pacing, not pausing
  - In July, over 1,000 lab employees asked governments for tools to do this
- (click) Make it a top priority. This isn’t only an engineering problem. AI companies and governments need to treat it as a top priority, and they respond to public pressure
- (click) Your part: stay informed and talk about it. That’s how priorities change
  - You might be well informed. But your parents’ generation, or your grandparents’, most likely have no grasp of what’s happening

## 43 · Go deeper
- If you want to go deeper, here’s where to start
- From Inside: the interviews from the video
- The METR report: the full Hugging Face story, with lots more of the agents’ own words
> One last thought.

## 44 · Closing + questions
- Back to the title: “not ready” doesn’t mean “can’t get ready”
- (click) These were warning shots, and we were lucky to get them
- (click) The responsibility is incredible. So is the chance to get it right
- Thank you
- Questions. The QR code has the slides and sources
