import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const About = () => {
    return (
      <Box className="card-border">
        <Typography variant="paragraph">
          <h3>About Us</h3> <ul>
            <li>
              Canadian Chamber of Commerce in Egypt was officially
              inaugurated on the 31st of May 2006. It was established in Egypt as a
              non-profit and non-governmental organization.
            </li> <li>
              It is an official member
              at the Canadian Chamber of Commerce in Canada; having access to their
              members database who mounts to 195,000. CanCham gives you and your
              company access to information and contacts.
            </li> <li>
              CanCham offers
              opportunities for involvement. It is an excellent chance to make your
              dream comes true; as well as maximizing your knowledge and growth
              potential in your dealings between Egypt and Canada.
            </li> <li>
              CanCham aims to
              build a strong platform for coordinating a broad array of social and
              business events that reach the entire population from local business
              leaders to new entrepreneurs.
            </li>
          </ul><br/> <h3>Our Mission</h3> <ul>
            <li>
              Develop and facilitate
              constructive relationships between the Canadian and Egyptian business
              communities.
            </li> <li>
              Establish a professional link for beneficial business
              reciprocation between Canadian and Egyptian entrepreneurs, while
              supporting and implementing their business interests.
            </li> <li>
              Distributing
              trade leads and business opportunities from different sources to the
              CanCham members.
            </li>
          </ul><br/> <h3>Objectives</h3> <ul>
            <li>
              Encourage and maintain long-term
              relationships between Canadian business executives and their Egyptian
              counterparts through holding business meetings, trade fairs, forums,
              seminars, and/or social gatherings.
            </li> <li>
              Organize trade missions and
              maintain the link between senior executives of member companies with
              key business and government leaders in both countries.
            </li> <li>
              Provide
              information to member companies on economic and political trends and
              developments in Canada leading to effective investment.
            </li>
          </ul>
        </Typography>
      </Box>
    );
}
 
export default About;