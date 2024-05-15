import { FaLinkedin } from "react-icons/fa";

function Footer() {
    const redirectToURL = (url) => {
        window.open(url, "_blank");
    };
    const linkedinProfiles = [
        {
            url: "https://www.linkedin.com/in/enrique-kloosterman-9090aa1b5/",
            photo:
                "https://media.licdn.com/dms/image/D4E35AQEpRZYHgR9a7w/profile-framedphoto-shrink_200_200/0/1649168456156?e=1689354000&v=beta&t=yf0M1N3fYHyRI7L6x6dWXUaae1eBLYu5UtiWbLDr3Y0",
            name: "Enrique Kloosterman",
        },
        {
            url: "https://www.linkedin.com/in/malvina-pacheco-376a59190/",
            photo:
                "https://media.licdn.com/dms/image/D4D03AQG1fQ2hcOfCRg/profile-displayphoto-shrink_200_200/0/1681255532685?e=1693440000&v=beta&t=U1sZCD3NAWIuAUwFZfZcAQpX833yZXD6Q18PbfZFzug",
            name: "Malvina Pacheco",
        },
        {
            url: "https://www.linkedin.com/in/florencia-da-rosa-a6823a272/",
            photo:
                "https://media.licdn.com/dms/image/D4D03AQHvp17n4XdDug/profile-displayphoto-shrink_200_200/0/1683844037443?e=1693440000&v=beta&t=4VSVbdxFH5_CfewMq-ZYbquYXiBCySTyyyys0dNpXrk",
            name: "Florencia da Rosa",
        },
    ];
    return (
        <footer className="container mx-auto p-5 grid grid-cols-3 bg-slate-400/50 rounded-md mt-5 ">
            {linkedinProfiles.map((profile, index) => (
                <div key={index} className="p-5">
                    <p className="text-center text-xs md:text-lg lg:text-2xl font-bold mb-2">
                        {profile.name}
                    </p>
                    <img
                        src={profile.photo}
                        alt="LinkedIn Profile"
                        className="rounded-full w-[80px] mx-auto"
                    />
                    <FaLinkedin
                        onClick={() => redirectToURL(profile.url)}
                        style={{ cursor: "pointer" }}
                        className="text-4xl text-center text-blue-700 mx-auto"
                    />
                </div>
            ))}
        </footer>
    )
}

export default Footer