function Home() {
    const bg = { backgroundColor: "#f4f3ee", outerWidth: '200vw', outerHeight: '200vh' };
    const css = { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '100px' }
    return (
        <body style={bg}>
            <div style={{ display: 'inline' }}>
                <h4 style={{ paddingLeft: "50px", paddingTop: '30px', color: "#f00" }}> SQL Developer</h4>
                <h4 style={{ paddingLeft: "550px", paddingTop: '0px', color: "#fca311" }}> Software Engineer</h4>
                <h4 style={{ paddingLeft: "1200px", color: "#6096ba" }}> Data Analyst</h4>
            </div>
            <div style={css}>
                <h1>GetHired</h1>
                <br />
                <span>
                    <h4>The smart hiring portal</h4>

                </span>


            </div>
            <div style={{ display: 'inline' }}>
                <h4 style={{ paddingLeft: "50px", color: "#f4acb7" }}> Data Scientist</h4>
                <h4 style={{ paddingLeft: "550px", color: "#2d3142" }}> Full Stack Developer</h4>
                <h4 style={{ paddingLeft: "1200px", color: "#ffae33", paddingBottom: '250px' }}> Blockchain Developer</h4>
            </div >
        </body>

    )
}

export default Home;