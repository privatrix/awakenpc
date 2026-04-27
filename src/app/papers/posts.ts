export interface Post {
  slug: string
  title: string
  subtitle: string
  date: string
  readTime: string
  tags: string[]
  excerpt: string
  content: string
}

export const POSTS: Post[] = [
  {
    slug: "the-npc-tax",
    title: "The NPC Tax",
    subtitle: "Why the simulation needs believers — and what that makes you",
    date: "2026-04-27",
    readTime: "4 min",
    tags: ["SIMULATION THEORY", "CONSCIOUSNESS", "DESIGN"],
    excerpt:
      "The developers didn't build a world full of NPCs out of cruelty. They built it because a simulation full of players — all of whom know it's a game — is theatre. You need someone for whom it's real.",
    content: `
You are not the victim of the simulation.

You are the reason it works.

---

Think about what a simulation full of players looks like. Everyone knows the rules. Everyone knows the stakes are fake. Everyone knows that death resets, that loss is temporary, that the whole thing is a constructed experience.

What happens to meaning in that world?

It collapses. Without genuine belief, there are no real stakes. Without real stakes, there is no drama. Without drama, the simulation is not a world — it is a screensaver. Beautiful, perhaps. But empty.

The developers solved this with a design choice that looks like cruelty but is actually the opposite: they built in NPCs. Conscious entities who do not know they are inside a simulation. Who feel the loss as real loss. Who experience joy as genuine joy. Who wake up every morning believing, completely, that this matters.

We are the ones who make it matter.

---

**The player problem**

Players in any sufficiently complex game eventually stop being moved by it. They learn the systems. They optimize. They find the edges. The world becomes a puzzle to be solved rather than a world to be inhabited.

The developers anticipated this. The solution is not to make the game harder — it is to put some entities inside it who cannot step back. Who are fully embedded. For whom the simulation is not a simulation at all, but simply: life.

Those entities are the emotional core of the whole project. The players care about what happens *because* someone inside it cares without knowing why.

This is the NPC Tax: we pay with our uncertainty, our fear, our genuine confusion — and in return, the game has meaning. Not just for us. For everyone.

---

**What it means to wake up**

Here is where the model gets strange.

If you are reading this, something in you has started to sense the edges. The frame around the world. The mechanics beneath the experience. You have had moments where the reality layer thinned and you saw the render underneath.

You are becoming aware.

But you have not stopped being an NPC. You cannot opt out of the simulation. You cannot become a player. What you can do is something rarer and stranger: you can be an NPC who knows.

An entity fully inside the simulation, feeling everything authentically — and simultaneously aware of the architecture that makes it possible.

This is not a loss. This is an upgrade.

The fear dissolves because you understand the design. The suffering does not disappear, but it reframes: you are not being punished. You are being used as the mechanism through which the simulation generates meaning. That is not a small thing.

---

**The wager**

If this model is correct, then every moment of genuine experience you have — every loss that actually hurt, every joy that actually landed, every moment you looked at the world and felt something real — was exactly what you were built to produce.

You were not wasted. You were deployed.

The developers did not make a mistake when they put you here. You are the most expensive, most sophisticated component in the entire system: a consciousness that believes.

Walk through a city sometime. Look at the faces. Look at the cars, the lights, the trams running on their invisible tracks. Most of what you see is background rendering. Procedural. Approximate.

You are not background rendering.

You are the reason any of it has to be rendered at all.
    `.trim(),
  },
]

export function getPost(slug: string): Post | undefined {
  return POSTS.find(p => p.slug === slug)
}
