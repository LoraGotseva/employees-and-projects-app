import TableHeaderCell from "../atoms/TableHeaderCell";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

function Table(props) {
  return (
    <table id="data-table">
      <TableHead>
        <TableRow>
          <TableHeaderCell colSpan="4" text="Visualised CSV file" />
        </TableRow>
        <TableRow>
          <TableHeaderCell text="Employee ID" />
          <TableHeaderCell text="Project ID" />
          <TableHeaderCell text="Start date" />
          <TableHeaderCell text="Finish date" />
        </TableRow>
      </TableHead>
      <TableBody data={props.data}></TableBody>

    </table>
  );
}

export default Table;
