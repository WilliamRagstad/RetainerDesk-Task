async function getEmployees() {
    let request = await fetch('http://dummy.restapiexample.com/api/v1/employees');
    let json = await request.json();
    return json.data;
}

function Employees() {
    let [employees, setEmployees] = React.useState([]);
    let [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        getEmployees().then(data => {
            setEmployees(data);
            setLoading(false);
        });
    }, [])

    return <div>
        <table>
            <thead>
                <tr>
                    <th className="profile">Profile</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Salary</th>
                    <th>Age</th>
                </tr>
            </thead>

            <tbody className="bg-gray-50">
				{employees.map(employee => <tr key={employee.id}>
					<td className="border"><img className="profile" src={employee.profile_image || `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 69 + 1)}`}/></td>
					<td className="border centered">{employee.id}</td>
					<td className="border">{employee.employee_name}</td>
					<td className="border centered">{employee.employee_salary}</td>
					<td className="border centered">{employee.employee_age}</td>
				</tr>)}
            </tbody>
        </table>

        {loading && <div className="lds-ellipsis"> <div></div><div></div><div></div> </div>}
    </div>;
}

function App() {
    return <div className="container mx-auto p-8">
        <h1>List of Employees</h1>
        <Employees/>
		<footer>
			<p>By William Rågstad 2021-02-15.</p>
		</footer>
    </div>;
}

ReactDOM.render(<App/>, app); // app == window.app == document.getElementById("app")