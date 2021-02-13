import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.JSONArray;
import org.json.JSONObject;

public class Task {
	public static void main(String[] args) throws Exception {
		StringBuilder result = new StringBuilder();
		HttpURLConnection conn = (HttpURLConnection)(new URL("http://dummy.restapiexample.com/api/v1/employees")).openConnection();
		BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		String line;
		while ((line = rd.readLine()) != null) result.append(line);
		rd.close();
		
		JSONObject myResponse = new JSONObject(result.toString());
		JSONArray employees = (JSONArray)myResponse.get("data");

		System.out.println("id\temployee_name\t\temployee_salary\temployee_age\tprofile_image\r\n" + 
						   "--\t-------------\t\t---------------\t------------\t-------------");
		for (int i = 0; i < employees.length(); i++) {
			JSONObject employee = employees.getJSONObject(i);
			int id = Integer.parseInt((String)employee.get("id"));
			String name = (String)employee.get("employee_name");
			String salary = (String)employee.get("employee_salary");
			int age = Integer.parseInt((String)employee.get("employee_age"));
			String profile_image = (String)employee.get("profile_image");
			
			String namespace = "   \t\t\t";
			if (name.length() > 7) namespace = "\t\t";
			if (name.length() > 14) namespace = " \t";
			
			System.out.println(id + "\t" + name + namespace + salary + "\t\t" + age + "\t" + profile_image);
		}
	}
}