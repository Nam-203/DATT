export const ProductSpecs = (props) => {
  const { specsList } = props;

  return (
    <table className='specs-table'>
      <tbody className='specs-table-content'>
        {specsList?.map(([key, value], index) => (
          <tr key={index} className='specs-table-row'>
            <td className='specs-table-item specs-key'>{key}</td>
            <td className='specs-table-item specs-value'>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
