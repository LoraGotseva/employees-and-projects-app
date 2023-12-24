import TableDataCell from "../atoms/TableDataCell";
import TableRow from "./TableRow";

function TableBody(props) {
  return (
    <tbody>
    {props.data.map((row, index) => (
      <TableRow key={index}>
        <TableDataCell>{row[0]}</TableDataCell>
        <TableDataCell>{row[1]}</TableDataCell>
        <TableDataCell>{row[2]}</TableDataCell>
        <TableDataCell>{row[3]}</TableDataCell>
      </TableRow>
    ))}
  </tbody>
  );
}
export default TableBody;
