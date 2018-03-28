import React from 'react';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';

export default class IntroView extends React.PureComponent {
  static propTypes = {
    totalFunding: PropTypes.number.isRequired,
  };

  render() {
    const { totalFunding } = this.props;
    return (
      <Card className="card">
        <CardContent>
          <div className="description" style={{ marginTop: 10 }}>
            <h2>Qatar's funding activities across Europe</h2>
            <p>This chart shows funding from Qatar to organizations linked to the Muslim Brotherhood (IMB) in Europe. Qatar keeps investing in large projects, 
            mosques and Islamic centers, wheich are typically managed by associations cennected to the MB. The Doha-based Qatar Charity (QC) plays a decisive role in this context,
            but payments are also made by other Qatari foundations, the ruling al-Thani family or private donors. The following figures are in Euro and illustrate payments in the range of
            the last 10 years.</p>
            <p>For a printable PDF view of the data, please see <a href="https://qceu.s3.amazonaws.com/report.pdf">here</a>.</p>
          </div>
          <div className="footer">
            <Typography type="headline" component="h1">Total Funding so far: {new Intl.NumberFormat('en-US').format(totalFunding)} &euro;</Typography>
          </div>
        </CardContent>
      </Card>
    );
  }
}
