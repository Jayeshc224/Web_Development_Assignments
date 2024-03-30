import { ListGroup } from "react-bootstrap";
import ey from '../assets/ernstandyoung.jpeg'
import jj from '../assets/johnson__johnson.jpeg'
import walmart from '../assets/walmart.jpeg'
import vertex from '../assets/vertex_pharma.jpeg'
import sharkninja from '../assets/sharkninja.jpeg'
function About() {
    const companydetails = [
        {
            companyName: "Walmart",
            companyCEO: "Doug McMillon",
            establishedYear: "1962",
            HQ: "Bentonville, Arkansas",
            image: walmart
        },
        {
            companyName: "Ernst&Young",
            companyCEO: "Carmine Di Sibio",
            establishedYear: "1989",
            HQ: "London, United Kingdom",
            image: ey
        },
        {
            companyName: "Johnson&Johnson",
            companyCEO: "Joaquin Duato",
            establishedYear: "1886",
            HQ: "New Brunswick, New Jersey",
            image: jj
        },
        {
            companyName: "Vertex Pharmaceuticals",
            companyCEO: "Reshma Kewalramani",
            establishedYear: "1989",
            HQ: "Boston, Massachusetts",
            image: vertex
        },
        {
            companyName: "SharkNinja",
            companyCEO: "Mark Rosenzweig",
            establishedYear: "1998",
            HQ: "Needham, Massachusetts",
            image: sharkninja
        },

    ]

    const styles = { padding: '20px', backgroundColor: '#f4f3ee', outerHeight: '100vh' }
    const st1 = { borderColor: "#151515", borderWidth: "5px", margin: "10px", backgroundColor: "#e5e0ce" }
    let populateCompDetails = companydetails.map(e => {
        return (
            <div>
                <ListGroup >
                    <ListGroup.Item style={st1}>
                        <b>{e.companyName}</b><br />
                        <b>CEO:</b> {e.companyCEO} <br />
                        <b>Established in:</b> {e.establishedYear} <br />
                        <b>Headquarted in:</b> {e.HQ}
                        <img src={e.image} style={{ marginLeft:"1300px"}} />

                    </ListGroup.Item>

                </ListGroup>

            </div>
        )

    })

    return (
        <body style={{ backgroundColor: '#f4f3ee' }}>

            <h2>Some information about companies</h2>
            <div style={styles}>
                {populateCompDetails}
            </div>
        </body>
    )
}

export default About;