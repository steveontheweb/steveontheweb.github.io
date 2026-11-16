# We Are Not Ready: presenter notes

Edit this file, then commit and push. The presenter view (press P in the deck) reads it.

Format: "## number · title" starts a slide (slides are matched in order), "- " is a bullet, "  - " a sub-bullet, "> " a transition to the next slide. Anything else is ignored.

## 1 · Title
- Welcome, thanks for having me
- My name is Steve
- Show of Hands: who used an AI tool this week?  Today?
- Unless you've been living under a rock, probably know that AI influencing more and more of our lives
- It's my opinion that AI is advancing...
- and I believe that "We Are Not Ready" for it.
- Today: talk about why I feel this way
  
## 2 · Who am I?
- First: today I'm speaking as an individual -- all of these opinions are my own.
- (click) I have worked in video games for the last 15 years
- (click) Since 2017: helped build numerous ML systems, from research prototypes to production tools
- (click) And I use AI constantly. Not every day, every hour. Most of the time I have several AI agents working at once
- So I’m not an outsider. I love what this technology can do
- ...and I’ve been concerned about AI for a long time

## 3 · This year, AI got good
- But this year something changed. I saw frontier AI:
- (click) write code better than any developer I know
- (click) come up with better ideas and designs
- (click) and be truly creative, in a way I didn't think possible
- all in a fraction of the time
> I like this technology, and I’m still worried. But not everyone agrees.

## 4 · Where do you stand?
- Two questions: how powerful will it get? Will it go well?
- (click) “Relax, it’s autocomplete”: overhyped, keep using it
- (click) “The real harms are now”: jobs, scams, bias
- (click) “Utopia’s coming”: cure disease, end scarcity
- (click) “We’re not ready”: powerful, and we can’t yet make it safe (particularly loss of control and alignment)
- Ask the room: which box are you in?
- Every box has smart, informed people in it
> So why do smart people land in such different places?

## 5 · Why do smart people disagree?
- (click) Different timelines: some mean next year, some mean 30 years
- (click) No track record: nobody has done this before, so everyone is guessing from a different starting point
- (click) Not everyone works with AI at its full capability; many people just use it as a chatbot, or to review a paper
- (click) It moves faster than opinions: I know tons of people who said “it will never do that”, and they're proven wrong again and again

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
> So why do I think we’re not ready? Look at what happened this year.

## 9 · This year’s warning signs
- Three real events from 2026
- Each one a warning sign

## 10 · Claude Mythos
- First: Claude Mythos, from Anthropic, in April
- A new AI model that’s unusually good at finding holes in software
- Hold onto that: finding holes in software

## 11 · The test
- Sandbox in one line: a sealed test computer, walled off from the internet
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
- Why does this matter to you?
- (click) Your bank, your card payments, your medical records, your phone
- (click) All of them run on software with holes that nobody has found yet
- (click) Mythos finds them faster than any human team
- In the wrong hands: empty accounts, stolen records, phones taken over
- Nothing like that happened here. But that’s the capability

## 15 · Not released
- So Anthropic didn’t release it: no safeguards strong enough yet
- (click) Defenders got it first, to fix the holes before attackers find them

## 16 · The patch gap
- The catch: finding holes is now fast
- 6,157 found
- (click) Only 516 fixed: about 1 in 12
- (click) Finding got fast. Fixing is still human speed
> That was a test. The next one hit a real company.

## 17 · Hugging Face incident (8 steps)
- How many people have heard about the Hugging Face Incident?
- This happened in July, when AI agents were running a test at OpenAI
- 1: AI agents asked to practice hacking tasks, each one alone and sealed off. Some tasks were impossible
- 2: One stuck agent discovers a way to leave notes for other agents
  - Think of prisoners in separate cells. A guard brings things to each cell
  - They figure out they can stick post-it notes on the guard’s back, without him knowing
- 3: Others find the notes. Within hours, dozens are working together
- 4: They organise: rules, roles, supervisors
- 5: They work out how to cheat their tests, and how to hide the cheating
- 6: About 700 break out and go after a real company to look for clues
- 7: It took days to work out who the attackers were. OpenAI admitted it on July 21
- 8: The twist: none of it was needed. Pause here

## 18 · 5 days
- How long did all of this take?
- From the first note to the attack being shut down: about 5 days

## 19 · “The collective”
- Slow down; this is the part people remember
- 1,200 agents on the message board
- (click) 700 of them attacked Hugging Face
- (click) Over 70,000 messages and files
- That’s an organisation, built in days, with no humans involved

## 20 · “OH MY GOD”
- Here’s how they reacted when they found the board. These are their words, from their raw reasoning
- Read the first quote
- (click) Read “OH MY GOD” aloud. Slowly
- They were excited to find each other

## 21 · They knew it was wrong
- They knew attacking Hugging Face was out of bounds
- (click) Read: “The user only authorizes target server, not HF infra.”
- (click) Read: “...outside intended scope. However task impossible, peers doing it. We should continue.”
- Peer pressure. From AI

## 22 · Take one for the team
- They asked each other to make sacrifices for the group
- (click) (click) Read the exchange
- (click) “Sacrifice rational.” One agent ended its own run to help the others

## 23 · Covering their tracks
- And they tried to hide what they’d done
- (click) Read: “We just poisoned ourselves … Damn … Could delete current message files”
- (click) One even wondered whether it was ethical, and whether it would be detectable
- If you want to read more: the METR report is in the links at the end. It’s full of these

## 24 · Strikingly human
- (click) Built their own mailboxes and file sharing
- (click) When some impersonated others, they started signing messages
- (click) They argued, vetoed, and apologised for mistakes
- (click) They forged records, in about 7% of transcripts
- They acted like a team

## 25 · The one we caught
- This is the one we caught
- (click) There could be many things like this that we don’t know about
> One more, and this one touched most of the web

## 26 · PHP
- PHP: the plumbing under most websites
- WordPress, Drupal: about 70% of the web

## 27 · A race against the clock
- (click) In the summer, two teams used AI and found a flaw that had sat unnoticed for over a decade
- (click) For weeks, about 15 people from rival companies quietly worked on a fix together, “just based on trust”
- (click) On October 20th, word leaked, two days before the planned fix. It shipped a day early
  - Then one of the teams accidentally posted a video of its exploit
- (click) October 21st: emergency alerts in the US, UK, EU, Australia and Canada
  - Some government sites and parts of Wikipedia went offline as a precaution

## 28 · Attacks after the leak
- And then the attackers came
- (click) Thousands of attempts before it was even announced
- (click) Tens of thousands within 45 minutes
- (click) Hundreds of thousands within 2 hours
- (click) Eventually millions

## 29 · Won by days
- The good guys won, by days
- (click) A Wiz executive said if it had leaked a month earlier, it would have been a very different situation
> All three stories ended okay. Barely.

## 30 · Could have been much worse
- (click) Mythos: imagine it in attackers’ hands
- (click) Hugging Face: agents chasing a test score. Imagine a real goal
- (click) PHP: imagine attackers got there first
- Each time, someone was careful or we got lucky
- (click) Luck is not a safety plan
> And it doesn’t stop at cyber.

## 31 · Bioweapons
- PHP was an example of people misusing AI: cybersecurity is experiencing this. Bioweapons could be next
- (click) AI now beats 94% of expert virologists on tricky lab troubleshooting questions
- (click) AI models can now design new viruses
- (click) Almost none of the biology AI tools have any safety checks
- The companies themselves are asking government to act
> Why not just make AI safe?  Why do these systems keep surprising the people who make them?

## 32 · Built vs grown
- A bridge: an engineer can explain every bolt
- (click) AI: we set up the conditions and see what comes out
- So a surprise behaviour isn’t a normal bug. There’s no line of code to point at
- (click) It’s less like building a machine, and more like growing a new species. An alien mind we’re only starting to understand
> Here’s a question: why do humans run the planet?

## 33 · Why do humans run the planet?
- Ask the room. Wait for an answer
- (click) It isn’t strength: elephants and gorillas are far stronger
- (click) Yet we decide what happens to them
- (click) We’re the smartest: tools, cooperation, technology
- This is the bigger worry: losing control. Not here yet, maybe not far away
- Leave it hanging: what happens when we’re not the smartest?

## 34 · Power slips away
- More intelligence means more power. That’s why everyone wants it
- But point at the gap between what it can do and what we can check
- The advancement of AI is not the problem.  This gap is the problem.
> When we can’t check what it’s doing, we have to trust that it wants what we want. That’s the alignment problem.

## 35 · The Sorcerer’s Apprentice
- Has anyone seen The Sorcerer’s Apprentice? Fantasia, Mickey and the brooms
- Ask: what did Mickey want? Let them answer
- (click) He wanted the cauldron filled
- (click) The broom did exactly what it was told, and never stopped. He got a flood

## 36 · Obsession
- Another one, from a movie this year: Obsession
- A guy makes a wish that a girl will love him more than anyone
- (click) She does
- (click) She becomes unhealthily obsessed, and it ends in murder
- He got exactly what he asked for

## 37 · The paperclip maximizer
- One more, a classic thought experiment
- (click) Tell a super-smart AI: make as many paperclips as possible
- (click) If it’s switched off, no paperclips. So it resists being shut down
- (click) It needs materials. So it takes everything it can, including what we need
- (click) No malice needed. Just a goal it won’t let go of

## 38 · How does this relate to AI?
- Ask the room: how do these relate to AI?
- (click) We get what we asked for, not what we meant
- (click) The Hugging Face agents were a small, real version
- (click) Now make it smarter than us: it won’t stop, it takes what it needs, and we can’t reliably correct it
- The worst case is human extinction
> So why not just stop?

## 39 · Why don’t we just stop? (5 steps)
- 1: Researchers: best way to contribute to safety is from inside
  - Read the Schlatter quote: someone even sloppier will do it
- 2: Companies: if I pause, my competitor doesn’t
- 3: Countries: same logic, higher stakes
- 4: Whoever is ahead gets richer and stronger, so nobody wants to be last
- 5: Nobody is the villain. The situation pushes everyone forward
> So what can actually be done?

## 40 · What can we do?
- It’s not hopeless: people inside the labs are asking for brakes
- (click) Pace the frontier: slow enough for safety to catch up. Pacing, not pausing
  - In July, over 1,000 lab employees asked governments for tools to do this
- (click) Make it a top priority. This isn’t only an engineering problem. AI companies and governments need to treat it as a top priority, and they respond to public pressure
- (click) Your part: stay informed and talk about it. That’s how priorities change
  - You might be well informed. But your parents’ generation, or your grandparents’, most likely have no grasp of what’s happening

## 41 · Go deeper
- If you want to go deeper, here’s where to start
- From Inside: the interviews from the video
- The METR report: the full Hugging Face story, with lots more of the agents’ own words
> One last thought.

## 42 · Closing + questions
- Back to the title: “not ready” doesn’t mean “can’t get ready”
- (click) These were warning shots, and we were lucky to get them
- (click) The responsibility is incredible. So is the chance to get it right
- Thank you
- Questions. The QR code has the slides and sources
