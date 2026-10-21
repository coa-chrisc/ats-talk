import type { Picture } from "./types";

/** Part 3. The four lessons: slides 7 to 10, drawn in the world `ideas`. */
export const THE_FOUR_LESSONS: Picture[] = [
  {
    id: "ladder",
    number: "7",
    part: 3,
    world: "ideas",
    name: "Lesson one: give AI only the independence it needs",
    show: "Lesson one. Give AI only the independence the task requires.",
    say: "Lesson one is to give AI only the independence the task requires. The diagram shows four approaches. Automation follows fixed rules without AI. A copilot drafts work for a person to approve. In a workflow, people define the steps and AI helps with particular tasks. An agent chooses its own steps. Autonomy means how much AI can decide and do without a person. As AI makes more decisions independently, staff need to control its actions, review its work, and remain accountable for the results. Ask whether the task could be done with less autonomy. The City needs these approaches available so teams can choose the simplest one that meets the need. Some tasks need no AI at all. Software built with AI's help can still operate entirely through fixed rules.",
    see: ["The title settles, then both supporting sentences appear together. After a 0.6-second pause, the visual sequence begins. Four steps rise left to right like a stair, each a block: \"Automation\" with the caption \"Fixed rules, no AI\", \"Copilot\" with \"A person approves every step\", \"Workflow\" with \"People set the steps; AI helps inside them\", and \"Agent\" with \"Chooses its own steps\". A small green figure climbs onto the first step and stops; a deep-green tick appears over it with the label \"Stop here if it gets the job done\". A grey arrow along the top of the stair reads \"More autonomy requires more oversight\". Below the stair a small tool outline fills solid, labeled \"Plain tool\", with the caption \"Some jobs need no AI at all\". The slide ends on the stair, the figure on the first step, the grey arrow and the plain tool."],
    story: [
      "Automation follows fixed rules. Copilots, workflows, and agents give AI different roles.",
      "Choose the simplest approach that meets the need. Some tasks need no AI at all.",
    ],
    steps: [
      { id: "play", show: ["Automation", "Fixed rules, no AI", "Copilot", "A person approves every step", "Workflow", "People set the steps; AI helps inside them", "Agent", "Chooses its own steps", "Stop here if it gets the job done", "More autonomy requires more oversight", "Plain tool", "Some jobs need no AI at all"] },
    ],
  },
  {
    id: "enforce",
    number: "8",
    part: 3,
    world: "ideas",
    name: "Lesson two: design the system to enforce the agent's limits",
    show: "Lesson two. Design the system to enforce the agent's limits.",
    say: "Writing a rule in an agent's instructions is different from enforcing it in the system. Consider an agent asked to delete a record. If deletion is outside its permissions, the system rejects the request and the record stays intact. Another action may be permitted only after a person approves it; the system must wait for that authorization. Log requests, approvals, and outcomes so staff can investigate what happened. These controls work together. The appropriate permissions and approval requirements depend on the task and the consequences of an error. This is an illustrative design, not a claim that every City system already implements these controls.",
    see: ["An agent requests deletion. A request document moves toward the permission boundary and stops before it. The record remains untouched on the far side. A separate person-and-approval illustration appears below, followed by the action log. The animation makes the enforced limit visible rather than ranking abstract controls. Labels: \"Requested action\", \"Delete a record\", \"Permission check\", \"Deletion is not allowed\", \"Blocked\", \"The record stays intact\", \"A different action needs approval\", \"Wait for a person to authorize it\", \"Keep an action log\", \"Record requests, approvals, and outcomes\"."],
    story: [
      "Permissions determine which actions an agent can take. Instructions alone cannot enforce a limit.",
      "Require approval for sensitive actions, and record what the system allows or blocks.",
    ],
    steps: [
      { id: "play", show: ["Requested action", "Delete a record", "Permission check", "Deletion is not allowed", "Blocked", "The record stays intact", "A different action needs approval", "Wait for a person to authorize it", "Keep an action log", "Record requests, approvals, and outcomes"] },
    ],
  },
  {
    id: "people",
    number: "9",
    part: 3,
    world: "ideas",
    name: "Lesson three: train your own staff first",
    show: "Lesson three. Train your own staff before buying an AI product.",
    say: "Train the people who understand the service before committing to an AI product. Staff know the routine work, the exceptions, the data, and what residents need. Give them a bounded task on which to learn and test AI. Use what they learn to define requirements for quality, permissions, review, and cost. Then compare products against those requirements. This does not mean every employee must become an AI specialist or that training guarantees a successful purchase. It means the purchasing decision should be informed by people who can evaluate the work. BNY offers one example: trained staff now manage more than 130 AI agents. That illustrates staff responsibility at scale; the agent count alone does not measure training effectiveness.",
    see: ["Staff gather around a workbench. A drawn connection leads to hands-on practice at a computer, then to a requirements sheet whose checks draw in, then to two products with one option circled after comparison. Each stage and its caption arrive together from left to right. The staff-knowledge takeaway sits beneath the sequence, with one BNY example set off by an indigo rule at the right. Labels: \"Understand the work\", \"Service needs, data, and exceptions\", \"Learn and test\", \"Practice with a bounded task\", \"Define requirements\", \"Quality, access, controls, and cost\", \"Evaluate products\", \"Compare options against the need\", \"Staff bring service knowledge\", \"Training turns that knowledge into informed purchasing decisions\", \"BNY example\", \"Trained staff now manage more than 130 AI agents\"."],
    story: [
      "Staff know the service, the exceptions, and the people who depend on it.",
      "Help them test AI, define requirements, and judge whether a product improves the work.",
    ],
    steps: [
      { id: "play", show: ["Understand the work", "Service needs, data, and exceptions", "Learn and test", "Practice with a bounded task", "Define requirements", "Quality, access, controls, and cost", "Evaluate products", "Compare options against the need", "Staff bring service knowledge", "Training turns that knowledge into informed purchasing decisions", "BNY example", "Trained staff now manage more than 130 AI agents"] },
    ],
  },
  {
    id: "earn",
    number: "10",
    part: 3,
    world: "ideas",
    name: "Lesson four: start with mistakes that are easy to fix",
    show: "Lesson four. Start with tasks where mistakes are easy to fix.",
    say: "Lesson four addresses projects that remain pilots and never become useful services. Start with tasks where mistakes have little impact and are easy to fix. Take on more complex work once the first project runs reliably. The course describes four stages: explore, validate, deploy, and scale. At each checkpoint, the team reviews results before approving the next stage. It also gives six criteria for choosing early projects: frequent decisions, measurable impact, delays or difficulties in the current process, suitable data, rules that can be written down, and limited consequences if something goes wrong. Many early projects will involve AI assisting a person. Next, we will look at how the City's current work compares with these four lessons.",
    see: ["After the title settles, both supporting sentences appear together. After a 0.6-second pause, the next visual begins. The criteria at the right appear as one stationary group before the stair animation starts. The diagram contains a stair of four gates rises left to right, each a step with a small gate drawn on it: \"Explore\", \"Validate\", \"Deploy\", \"Scale\". A small green project box climbs onto the first step, and a deep-green tick lands beside it with the caption \"Ready for the next stage\". The box climbs to the second step and a second tick lands; the third step stays empty. The criteria shown beside the stair have the heading \"Criteria for first projects\", with six lines and neutral unfilled boxes: \"Frequent decisions\", \"Measurable impact\", \"Delays in the current process\", \"Suitable data available\", \"Rules that can be written down\", \"Limited consequences of error\". The slide ends on the stair with the box on its second step and the stationary criteria. No new supporting text appears during the climb."],
    story: [
      "Choose work where errors have little impact. Use the six criteria to assess possible projects.",
      "Check results at each stage before expanding. Take on harder work once the first project runs reliably.",
    ],
    steps: [
      { id: "play", show: ["Explore", "Validate", "Deploy", "Scale", "Ready for the next stage", "Criteria for first projects", "Frequent decisions", "Measurable impact", "Delays in the current process", "Suitable data available", "Rules that can be written down", "Limited consequences of error"] },
    ],
  },
];
