import React from 'react';
import { useDeck } from '../context/DeckContext';
import './Step3Resourcing.css';

const Step3Resourcing = () => {
  const { data } = useDeck();
  const resourcing = data.resourcingData || [];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ color: 'var(--accent-primary)' }}>Resourcing Estimates</h2>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Functional Heads estimates. (Read-only data verified from system)
            </div>
          </div>
        </div>

        <div className="resourcing-table-container">
          <table className="resourcing-table">
            <thead>
              <tr>
                <th rowSpan={2} style={{ textAlign: 'left', minWidth: '250px' }}>R&D Function</th>
                <th colSpan={4}>CY FTE</th>
                <th rowSpan={2}>CY IPE</th>
                <th colSpan={2}>2027</th>
                <th colSpan={2}>2028</th>
                <th colSpan={2}>2029</th>
                <th colSpan={3}>Project Total</th>
                <th colSpan={2} className="prior-approval">Prior Approval</th>
                <th rowSpan={2} className="sign-off">Sign-<br/>OFF*</th>
              </tr>
              <tr>
                <th>1Q</th>
                <th>2Q</th>
                <th>3Q</th>
                <th>4Q</th>
                <th>FTE</th>
                <th>IPE</th>
                <th>FTE</th>
                <th>IPE</th>
                <th>FTE</th>
                <th>IPE</th>
                <th>Algo<br/>FTE</th>
                <th>Fn Head<br/>FTE</th>
                <th>IPE</th>
                <th className="prior-approval">FTE</th>
                <th className="prior-approval">IPE</th>
              </tr>
            </thead>
            <tbody>
              {resourcing.map((row) => (
                <React.Fragment key={row.id}>
                  {/* Category Row */}
                  <tr className="category-row">
                    <td className="row-label">{row.name}</td>
                    <td>{row.cyFTE?.[0]}</td><td>{row.cyFTE?.[1]}</td><td>{row.cyFTE?.[2]}</td><td>{row.cyFTE?.[3]}</td>
                    <td>{row.cyIPE}</td>
                    <td>{row.y1FTE}</td><td>{row.y1IPE}</td>
                    <td>{row.y2FTE}</td><td>{row.y2IPE}</td>
                    <td>{row.y3FTE}</td><td>{row.y3IPE}</td>
                    <td>{row.projAlgoFTE}</td><td>{row.projFnHeadFTE}</td><td>{row.projIPE}</td>
                    <td>{row.priorFTE}</td><td>{row.priorIPE}</td>
                    <td>{row.signOff}</td>
                  </tr>
                  {/* Children Rows */}
                  {row.children?.map((child) => (
                    <tr key={child.id} className="child-row">
                      <td className="row-label">{child.name}</td>
                      <td>{child.cyFTE?.[0]}</td><td>{child.cyFTE?.[1]}</td><td>{child.cyFTE?.[2]}</td><td>{child.cyFTE?.[3]}</td>
                      <td>{child.cyIPE}</td>
                      <td>{child.y1FTE}</td><td>{child.y1IPE}</td>
                      <td>{child.y2FTE}</td><td>{child.y2IPE}</td>
                      <td>{child.y3FTE}</td><td>{child.y3IPE}</td>
                      <td>{child.projAlgoFTE}</td><td>{child.projFnHeadFTE}</td><td>{child.projIPE}</td>
                      <td>{child.priorFTE}</td><td>{child.priorIPE}</td>
                      <td>{child.signOff}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="row-label">Total:</td>
                <td colSpan={4}></td>
                <td></td>
                <td></td><td></td>
                <td></td><td></td>
                <td></td><td></td>
                <td></td><td></td><td></td>
                <td></td><td></td>
                <td style={{ background: '#4b5563' }}></td>
              </tr>
            </tfoot>
          </table>
        </div>
        
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', fontStyle: 'italic' }}>
          Source: Data output from IRM as of DD-MMM-YY
        </p>

      </section>
    </div>
  );
};

export default Step3Resourcing;
