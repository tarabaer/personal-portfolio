import { senators } from "../data/senators.js";
import { representatives } from "../data/representatives.js";
import { removeChildren } from "../utils/index.js";

const congressGrid = document.querySelector(".congressGrid");
const seniorityButton = document.querySelector("#seniorityButton");
const birthdayButton = document.querySelector("#birthdayButton");
const missedVotesButton = document.querySelector("#missedVotes");
const partyVotesButton = document.querySelector("#partyVotes");

seniorityButton.addEventListener("click", () => {
  senioritySort();
});

birthdayButton.addEventListener("click", () => {
  birthdaySort();
});

missedVotesButton.addEventListener("click", () => {
  alert(
    `${missedVotesRep.name} missed votes ${missedVotesRep.missed_votes_pct}% of the time!`
  );
});

partyVotesButton.addEventListener("click", () => {
  alert(
    `There are ${partyVotesArray.length} representatives who vote with their party ${partyVotes.votes_with_party_pct}% of the time!`
  );
});

function populateCongressGrid(simplePeople) {
  removeChildren(congressGrid);
  simplePeople.forEach((person) => {
    let personDiv = document.createElement("div");
    personDiv.className = `figureDiv`;
    let personFig = document.createElement("figure");
    let figImg = document.createElement("img");
    let figCaption = document.createElement("figcaption");
    let color;

    figImg.src = person.imgURL;
    figCaption.textContent = `${person.name}`;
    console.log(person.party)
    if (person.party === "R") {color = "red"}
    else if (person.party === "D") {color = "blue"}
    else if (person.party === "ID") {color = "green"}
    else {color = "black"};
    personDiv.style.backgroundColor = color;


    personFig.appendChild(figImg);
    personFig.appendChild(figCaption);
    personDiv.appendChild(personFig);
    congressGrid.appendChild(personDiv);
  });
}

function getSimplifiedCongress(congressPeople) {
  return congressPeople.map((person) => {
    let middleName = person.middle_name ? `${person.middle_name}` : ``;
    return {
      id: person.id,
      title: person.title,
      name: `${person.first_name} ${middleName} ${person.last_name}`,
      imgURL: `https://www.govtrack.us/static/legislator-photos/${person.govtrack_id}-200px.jpeg`,
      seniority: parseInt(person.seniority, 10),
      date_of_birth: parseInt(person.date_of_birth, 10),
      missed_votes_pct: person.missed_votes_pct,
      votes_with_party_pct: person.votes_with_party_pct,
      party: person.party
    };
  });
}

function senioritySort() {
  console.log(getSimplifiedCongress(senators));
  populateCongressGrid(
    getSimplifiedCongress(senators)
      .sort((a, b) => a.seniority - b.seniority)
      .reverse()
  );
}

function birthdaySort() {
  populateCongressGrid(
    getSimplifiedCongress(senators).sort(
      (a, b) => a.date_of_birth - b.date_of_birth
    )
  );
}

const missedVotesRep = getSimplifiedCongress(representatives)
  .filter((rep) => rep.title === "Representative")
  .reduce((acc, rep) =>
    acc.missed_votes_pct > rep.missed_votes_pct ? acc : rep
  );

const partyVotes = getSimplifiedCongress(representatives)
  .filter((rep) => rep.title === "Representative")
  .reduce((acc, rep) =>
    acc.votes_with_party_pct > rep.votes_with_party_pct ? acc : rep
  );

const partyVotesArray = getSimplifiedCongress(representatives).filter(
  (person) => {
    return person.votes_with_party_pct === partyVotes.votes_with_party_pct;
  }
);

console.log(partyVotesArray);

populateCongressGrid(getSimplifiedCongress(senators));
