Assignment 2-Personal Portfolio

Objective-The objective of this assignment is to build a professional portfolio which includes various things such as-
Name
Photograph
Personal Video
Certifications
Experience
Skillset
Contact
Resume
Jobs interested in


And I have done this assigment's 2 webpages in 2 column format(left-right column) index.html and about.html
I have also used external css file with name of styles.css to complete the styling of this assignment .

The requirements in our website are following-
Below, HTML and HTML5 controls MUST be there, and feel free to add more HTML and HTML5 controls.
a)Favicon
b)Table
c)Form
d)Images
e)Hyperlink
f)Button
g)audio
h)video
i)header
j)footer
k)summary
l)menu
m)tel for contact information
n)mailto for contact information
 
The grading rubrics include following requirement-
a)Use an external CSS file only.
b)Use of float and overflow property
c)Use of column layout structure
d)Use of absolute and relative position whenever necessary
e)Add a table, then style the table using CSS selectors. Guide for CSS Selectors - http://www.w3schools.com/cssref/css_selectors.asp Links to an external site.
f)Create a professional image gallery for certifications, etc., with hover effects and figure captions. Include this in your portfolio.
g)Make the website responsive using media queries for devices like iPad(768px) and Smart phones (350 – 365px). For example, below pic is a sample (scroll down 2nd page)
h)There is more weightage on the responsiveness of the page and media query implementation. Fail to implement will be reflected in the grading.


The commands we are using are for following requirements-

1)favicon-
 <link rel="icon" href="images/sanatPoplipic.jpeg" type="image/x-icon">

2)Images-
All the images are in different folder with name images.
<div class="header-image">
            <img src="images/sanatPoplipic.jpeg" alt="Sanat Popli">
        </div>

3)Video is also in images folder-
<section id="video" class="video-container">
                    <video controls>
                        <source src="images/SanatPopliIntro.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </section>

4)Audio--
 <div class="audio-player">
                    <audio controls>
                        <source src="audio/sanatpopliaudio.mp3" type="audio/mpeg">
                        Hi,I am Sanat Popli,Welcome to my portal.
                    </audio>
                </div>



5)table-
<div class="resume-column">
                    <section>
                    <h3>Technical Skills</h3>
                    <table class="skills-table">
                        <tr>
                            <th>Programming Languages</th>
                            <th>Web Technologies</th>
                            <th>Frameworks & Platforms</th>
                        </tr>
                        <tr>
                            <td>C++, Java, Python, JavaScript</td>
                            <td>SQL, HTML5, CSS3, Regex</td>
                            <td>Node.js, React, Angular, AWS</td>
                        </tr>
                    </table>
                </section>
                </div>


6)Form-Telephone number and email ie mailto is also used in this form

 <form>
            <div class="contact-columns">
                <div class="left-column">
                    <p><strong>Email:</strong> <a href="mailto:popli.sa@northeastern.edu">popli.sa@northeastern.edu</a></p>
                    <p><strong>Phone:</strong> <a href="tel:+18572227941">+18572227941</a></p>
                </div>
                <div class="right-column">
                    <p><strong>GitHub:</strong> <a href="https://github.com/SanatPopliNEU" target="_blank">SanatPopliNEU</a></p>
                    <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/sanat-popli-2107" target="_blank">Sanat Popli</a></p>
                </div>
        </form>

        

7)The header and footer of this website have similar pattern in terms of color combination in which header consist of menu bar and footer is just my name in text.

8)menu-hyperlinks are used in this menu tag

<menu>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="certifications.html">Certifications</a></li>
                </menu>
9)summary-

<summary>
                        I am a Web Developer and Data Scientist with a Bachelor's degree in Computer Science and a Master of Science in Information Systems candidate at Northeastern University.
                         I have a strong passion and enthusiasm for learning new technologies and domains, especially Data Science and Robotics. I have completed multiple online courses and certifications 
                         in Python, Data Science, and Robotics, demonstrating my ability to acquire new skills and apply them to real-world problems and challenges.
            
                         I have also developed web applications using Angular, PL/SQL, C#, and ASP.NET for the health care domain of Cognizant, one of the leading IT service providers in the world.
                         I collaborated with a team of developers and testers to deliver high-quality solutions that met the client's requirements and expectations. I used HTML5, TypeScript, and Robotics
                         to enhance the user interface and functionality of the web applications, increasing the user retention rate by 25%. My goal is to secure a summer internship in 2024 in the USA, 
                         where I can contribute to the growth and innovation of the industry with my skills and expertise.
</summary>

Button-

 <div>
            <a href="images/Sanat Popli_Resume.pdf" target="_blank" class="download-button">Download Resume (PDF)</a>
        </div>

For 2 column seperation i used left column and right column in iundex.html and about.html and mentioned the design in css sheet with name of styles.css

.left-column, .right-column {
    flex: 1;
    padding: 15px;
}

the above style sheet I used in my portal for 2 column seperation.


The most important part of this assignment was to implement responsiveness and adding media quesries for enabling it fit on different devices display.
/* Responsive Design */
@media (max-width: 768px) {
    .left-column, .right-column {
        flex-basis: 100%; /* Each column takes full width on smaller screens */
    }
}

@media (max-width: 768px) {
    .gallery figure {
        flex-basis: calc(50% - 10px);
    }
}

@media (max-width: 365px) {
    nav ul li {
        display: block;
        margin-bottom: 10px;
    }

    .gallery figure {
        flex-basis: 100%;
    }
    /* Existing styles remain unchanged */