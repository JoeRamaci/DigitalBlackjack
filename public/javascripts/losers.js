const LosersComponent = () => {
    React.useEffect(() => {
        fetch('/losersOut')
            .then(response => {
                if(!response.ok){
                    throw new Error('Network response not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("TABLE DATA" + data);
                const dataTable = simpleDatatables.DataTable("#myTable");
                dataTable.insert(data);
            })
            .catch(error => {
                console.error("Problem with fetch operation", error);
            });
    }, []); // Empty dependency array ensures this effect runs only once, after initial render
    
    return (
        <div>
            <table id='myTable'>
                <thead>
                    <tr>
                        <th>username</th><th>loss_count</th>
                    </tr>
                </thead>
            </table>
        </div>
    );
};

const losers = ReactDOM.createRoot(document.getElementById('losers'));
losers.render(<LosersComponent />);
