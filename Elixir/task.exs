defmodule ElixirTask do
  @doc """
  List all employees
  """
  def list_employees do
    :inets.start
    case :httpc.request(:get, {'http://www.dummy.restapiexample.com/api/v1/employees', []}, [], []) do
      {:ok, {_, _, content}} -> IO.puts(inspect content.data)
      err -> IO.puts("Error, Could not load employees: #{inspect err}")
    end
  end
end

ElixirTask.list_employees
