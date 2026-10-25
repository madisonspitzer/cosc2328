// HW7 - COSC 2328 - Professor McCurry
// Implemented by: Madison Spitzer

function PokemonCard(props) {
    return (
        <div className="pokemon-card">
            <img
                src={
                    "https://placehold.co/150x150/4FC3F7/333333?text=" +
                    props.name
                }
                alt={props.name}
            />

            <h2>{props.name}</h2>

            <p>{props.name.length} letters</p>
        </div>
    );
}

function PokemonRoster(props) {
    return (
        <div className="roster">
            {props.pokemon.map(function(item) {
                return (
                    <PokemonCard
                        key={item.name}
                        name={item.name}
                    />
                );
            })}
        </div>
    );
}

function App(props) {
    return (
        <div>
            <header>
                <h1>Pokemon Roster</h1>

                <p>
                    Showing {props.roster.length} short-named Pokemon,
                    shortest name first
                </p>
            </header>

            <PokemonRoster pokemon={props.roster} />
        </div>
    );
}

async function loadRoster() {
    try {
        const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon/?limit=151"
        );

        if (!response.ok) {
            throw new Error("Could not load the Pokemon roster.");
        }

        const data = await response.json();

        const filteredArray = data.results.filter(function(item) {
            return item.name.length <= 6;
        });

        const sortedArray = filteredArray.sort(function(a, b) {
            return a.name.length - b.name.length;
        });

        const root = ReactDOM.createRoot(
            document.querySelector("#root")
        );

        root.render(
            <App roster={sortedArray} />
        );

    } catch (error) {
        document.querySelector("#root").innerHTML =
            "<p class='error-message'>Something went wrong loading the roster.</p>";
    }
}

loadRoster();