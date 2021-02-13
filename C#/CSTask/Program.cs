using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Reflection;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CSTask
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var client = new HttpClient();
            var content = await client.GetStringAsync("http://dummy.restapiexample.com/api/v1/employees");
            JObject json = JObject.Parse(content);
            Employees employees = JsonConvert.DeserializeObject<Employees>(content);

            (string, int)[] columns = {("id", 1), ("employee_name", 2), ("employee_salary", 1), ("employee_age", 1), ("profile_image", 1)};
            WriteColumns(columns);
            foreach (Employee employee in employees.data) WriteRow(columns, employee);
            Console.WriteLine(employees);
        }

        static void WriteColumns((string, int)[] columns)
        {
            foreach ((string column, int tabs) in columns) Console.Write(column + Repeat('\t', tabs));
            Console.WriteLine();
            foreach ((string column, int tabs) in columns) Console.Write(Repeat('-', column.Length) + Repeat('\t', tabs));
            Console.WriteLine();
        }

        static void WriteRow((string, int)[] columns, Employee employee)
        {
            foreach ((string column, int tabs) in columns)
            {
                FieldInfo fieldInfo = typeof(Employee).GetField(column);
                Console.Write(fieldInfo?.GetValue(employee) + Repeat('\t', tabs));
            }
            Console.WriteLine();
        }

        static string Repeat(char c, int times)
        {
            string r = "";
            for (int i = 0; i < times; i++) r += c;
            return r;
        }
    }
}
