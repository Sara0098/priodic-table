
const elements = [
["H","Hydrogen"],["He","Helium"],
["Li","Lithium"],["Be","Beryllium"],["B","Boron"],["C","Carbon"],["N","Nitrogen"],["O","Oxygen"],["F","Fluorine"],["Ne","Neon"],
["Na","Sodium"],["Mg","Magnesium"],["Al","Aluminium"],["Si","Silicon"],["P","Phosphorus"],["S","Sulfur"],["Cl","Chlorine"],["Ar","Argon"],
["K","Potassium"],["Ca","Calcium"],["Sc","Scandium"],["Ti","Titanium"],["V","Vanadium"],["Cr","Chromium"],["Mn","Manganese"],["Fe","Iron"],["Co","Cobalt"],["Ni","Nickel"],["Cu","Copper"],["Zn","Zinc"],["Ga","Gallium"],["Ge","Germanium"],["As","Arsenic"],["Se","Selenium"],["Br","Bromine"],["Kr","Krypton"],
["Rb","Rubidium"],["Sr","Strontium"],["Y","Yttrium"],["Zr","Zirconium"],["Nb","Niobium"],["Mo","Molybdenum"],["Tc","Technetium"],["Ru","Ruthenium"],["Rh","Rhodium"],["Pd","Palladium"],["Ag","Silver"],["Cd","Cadmium"],["In","Indium"],["Sn","Tin"],["Sb","Antimony"],["Te","Tellurium"],["I","Iodine"],["Xe","Xenon"],
["Cs","Caesium"],["Ba","Barium"],["La","Lanthanum"],["Ce","Cerium"],["Pr","Praseodymium"],["Nd","Neodymium"],["Pm","Promethium"],["Sm","Samarium"],["Eu","Europium"],["Gd","Gadolinium"],["Tb","Terbium"],["Dy","Dysprosium"],["Ho","Holmium"],["Er","Erbium"],["Tm","Thulium"],["Yb","Ytterbium"],["Lu","Lutetium"],["Hf","Hafnium"],["Ta","Tantalum"],["W","Tungsten"],["Re","Rhenium"],["Os","Osmium"],["Ir","Iridium"],["Pt","Platinum"],["Au","Gold"],["Hg","Mercury"],["Tl","Thallium"],["Pb","Lead"],["Bi","Bismuth"],["Po","Polonium"],["At","Astatine"],["Rn","Radon"],
["Fr","Francium"],["Ra","Radium"],["Ac","Actinium"],["Th","Thorium"],["Pa","Protactinium"],["U","Uranium"],["Np","Neptunium"],["Pu","Plutonium"],["Am","Americium"],["Cm","Curium"],["Bk","Berkelium"],["Cf","Californium"],["Es","Einsteinium"],["Fm","Fermium"],["Md","Mendelevium"],["No","Nobelium"],["Lr","Lawrencium"],["Rf","Rutherfordium"],["Db","Dubnium"],["Sg","Seaborgium"],["Bh","Bohrium"],["Hs","Hassium"],["Mt","Meitnerium"],["Ds","Darmstadtium"],["Rg","Roentgenium"],["Cn","Copernicium"],["Nh","Nihonium"],["Fl","Flerovium"],["Mc","Moscovium"],["Lv","Livermorium"],["Ts","Tennessine"],["Og","Oganesson"]
];

const table = document.getElementById("periodic-table");
const search = document.getElementById("search");
const details = document.getElementById("details");

// Atomic number -> periodic table position
const positions = {};

function setRow(row, items) {
    items.forEach(([number, group]) => {
        positions[number] = [row, group];
    });
}

setRow(1, [[1,1],[2,18]]);

setRow(2, [
    [3,1],[4,2],[5,13],[6,14],[7,15],
    [8,16],[9,17],[10,18]
]);

setRow(3, [
    [11,1],[12,2],[13,13],[14,14],[15,15],
    [16,16],[17,17],[18,18]
]);

setRow(4, Array.from({length:18}, (_,i) => [i+19,i+1]));
setRow(5, Array.from({length:18}, (_,i) => [i+37,i+1]));

setRow(6, [
    [55,1],[56,2],[72,4],[73,5],[74,6],
    [75,7],[76,8],[77,9],[78,10],[79,11],
    [80,12],[81,13],[82,14],[83,15],[84,16],
    [85,17],[86,18]
]);

setRow(7, [
    [87,1],[88,2],[104,4],[105,5],[106,6],
    [107,7],[108,8],[109,9],[110,10],[111,11],
    [112,12],[113,13],[114,14],[115,15],
    [116,16],[117,17],[118,18]
]);

// Lanthanoids and actinoids in separate rows
setRow(9, Array.from({length:15}, (_,i) => [i+57,i+4]));
setRow(10, Array.from({length:15}, (_,i) => [i+89,i+4]));

// Element category
function getCategory(n) {
    if ([1,6,7,8,15,16,34].includes(n))
        return "nonmetal";

    if ([2,10,18,36,54,86,118].includes(n))
        return "noble";

    if ([9,17,35,53,85,117].includes(n))
        return "halogen";

    if ([3,11,19,37,55,87].includes(n))
        return "alkali";

    if ([5,14,32,33,51,52].includes(n))
        return "metalloid";

    if ((n >= 57 && n <= 71))
        return "lanth";

    if ((n >= 89 && n <= 103))
        return "act";

    if ([4,12,13,31,49,50,81,82,83,84,113,114,115,116].includes(n))
        return "other";

    return "transition";
}

// Create element cards
elements.forEach(([symbol, name], index) => {
    const number = index + 1;
    const position = positions[number];

    const card = document.createElement("div");
    card.className = "element " + getCategory(number);
    card.dataset.number = number;
    card.dataset.name = name.toLowerCase();
    card.dataset.symbol = symbol.toLowerCase();

    card.style.gridRow = position[0];
    card.style.gridColumn = position[1];

    card.innerHTML = `
        <span class="number">${number}</span>
        <span class="symbol">${symbol}</span>
        <span class="name">${name}</span>
    `;

    card.addEventListener("click", () => {
        showDetails(number, symbol, name);
    });

    table.appendChild(card);
});

// Show selected element
function showDetails(number, symbol, name) {
    details.innerHTML = `
        <h2>Element Details</h2>
        <div class="big-symbol">${symbol}</div>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Atomic Number:</strong> ${number}</p>
        <p><strong>Symbol:</strong> ${symbol}</p>
        <p><strong>Category:</strong> ${getCategory(number)}</p>
    `;
}

// Search by name, symbol or atomic number
search.addEventListener("input", function () {
    const value = search.value.trim().toLowerCase();

    document.querySelectorAll(".element").forEach(card => {
        const matches =
            card.dataset.name.includes(value) ||
            card.dataset.symbol.includes(value) ||
            card.dataset.number === value;

        card.style.opacity = matches ? "1" : "0.15";
        card.style.filter = matches ? "none" : "grayscale(1)";
    });
});
