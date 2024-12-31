import React from "react";
import Image from "next/image";

const Profile = ({ imgSrc, name, position, description, socialLinks }) => {
  return (
    <div className="profile">
      <Image src={imgSrc} alt={name} width={150} height={150} />
      <h3>{name}</h3>
      <p className="position">{position}</p>
      <p className="description">{description}</p>
      <div className="social-links">
        {socialLinks.map((link, index) => (
          <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

const Team = () => {
  const members = [
    {
      imgSrc: "/images/member1.jpg",
      name: "John Doe",
      position: "Team Leader",
      description: "John leads the team with a focus on innovation.",
      socialLinks: [
        { icon: <i className="fab fa-twitter" />, url: "https://twitter.com/johndoe" },
        { icon: <i className="fab fa-linkedin" />, url: "https://linkedin.com/in/johndoe" },
      ],
    },
    {
      imgSrc: "/images/member2.jpg",
      name: "Jane Smith",
      position: "Developer",
      description: "Jane specializes in frontend development.",
      socialLinks: [
        { icon: <i className="fab fa-github" />, url: "https://github.com/janesmith" },
      ],
    },
    {
      imgSrc: "/images/member3.jpg",
      name: "Mike Johnson",
      position: "Designer",
      description: "Mike crafts stunning user interfaces.",
      socialLinks: [
        { icon: <i className="fab fa-dribbble" />, url: "https://dribbble.com/mikejohnson" },
      ],
    },
  ];

  return (
    <div className="team">
      <h2>Meet Our Team</h2>
      <div className="team-members">
        {members.map((member, index) => (
          <Profile
            key={index}
            imgSrc={member.imgSrc}
            name={member.name}
            position={member.position}
            description={member.description}
            socialLinks={member.socialLinks}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;
