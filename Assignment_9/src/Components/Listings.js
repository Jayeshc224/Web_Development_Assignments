import { Accordion } from 'react-bootstrap';

function Listings() {
  const styles = { padding: '20px', backgroundColor: '#f4f3ee' }
  const jobPosts = [
    {
      id: 1,
      title: 'Full Stack Developer',
      description: 'Join our dynamic team to work on cutting-edge technologies. Develop and maintain sophisticated web applications for our diverse client base.',
      lastUpdated: 'Last updated 2 days ago',
      skills: 'HTML,CSS,Bootstrap, JS,ReactJS, NodeJS, NoSQL databases ',
      Salary: '$100000',
      applyLink: 'https://example.com/apply/full-stack-developer',
    },
    {
      id: 2,
      title: 'Digital Marketing Specialist',
      description: 'Elevate our digital marketing strategies to promote our innovative products. Proficiency in SEO, SEM, and social media marketing is highly valued.',
      lastUpdated: 'Last updated 1 day ago',
      skills: 'SEO, SEMRush, Google Analytics, Basic website knowledge ',
      Salary: '$97000',
      applyLink: 'https://example.com/apply/digital-marketing-specialist',
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      description: 'Shape engaging user experiences and create visually captivating designs. Work alongside cross-functional teams to turn ideas into reality.',
      lastUpdated: 'Last updated 4 hours ago',
      skills: 'Figma, Adobe XD, Canva, Creative and Design Skills ',
      Salary: '$110000',
      applyLink: 'https://example.com/apply/ux-ui-designer',
    },
    {
      id: 4,
      title: 'Data Scientist',
      description: 'Leverage advanced analytics and machine learning to uncover insights from vast data sets. Proficiency with Python and R is a must.',
      lastUpdated: 'Last updated 3 days ago',
      skills: 'Python, R, SQL, Machine Learning, Tensorflow/PyTorch, AWS/GCP/Azure ',
      Salary: '$120000',
      applyLink: 'https://example.com/apply/data-scientist',
    },
    {
      id: 5,
      title: 'Customer Support Representative',
      description: 'Deliver unparalleled customer service and support. Exceptional communication skills and a knack for solving problems are key.',
      lastUpdated: 'Last updated 6 hours ago',
      skills: 'ServiceNow/Jira/Workday, Basic computer skills, GSuite experience preferred ',
      Salary: '$70000',
      applyLink: 'https://example.com/apply/customer-support-representative',
    },
    {
      id: 6,
      title: 'Data Analyst',
      description: 'Discover hidden insights from unstructured data and solve business problems. Prior experience in Python, SQL and Tableau required.',
      lastUpdated: 'Last updated 5 days ago',
      skills: 'Python, R, SQL, Tableau/PowerBI, Analytical Skills',
      Salary: '$80000',
      applyLink: 'https://example.com/apply/data-analyst',
    }
  ]

  let showJobListings = jobPosts.map(e => {
    return (
      <div>

        <Accordion defaultActiveKey="0" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header >{e.title}</Accordion.Header>
            <Accordion.Body>
              {e.description} <br />
              Salary: {e.salary} <br/>
              Skills required: {e.skills} <br/>
              <a href={e.applyLink}>{e.applyLink}</a>
              ({e.lastUpdated}) <br />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    )

  })
  return (
    <div style={styles}>

      <h4>Available Job Openings</h4>
      {showJobListings}
    </div>

  )
}

export default Listings;