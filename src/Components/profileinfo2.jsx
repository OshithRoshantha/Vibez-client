import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

const Profile = ({ imgSrc, name, position, description, socialLinks }) => {
  return (
    <div className="profile">
      <Image 
        src={imgSrc} 
        alt={`${name}'s profile picture`} 
        width={150} 
        height={150} 
        loading="lazy" 
        className="profile-image"
      />
      <h3 className="profile-name">{name}</h3>
      <p className="profile-position">{position}</p>
      <p className="profile-description">{description}</p>
      <div className="profile-social-links">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${name}'s ${link.name || "social link"}`}
            className="profile-social-link"
          >
            {link.icon || <span className="default-icon" title="Social Link">🔗</span>}
          </a>
        ))}
      </div>
    </div>
  );
};

Profile.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.element,
      url: PropTypes.string.isRequired,
      name: PropTypes.string,
    })
  ).isRequired,
};

const Team = () => {
  const members = [
    {
      imgSrc: "/images/member1.jpg",
      name: "John Doe",
      position: "Team Leader",
      description: "John leads the team with a focus on innovation.",
      socialLinks: [
        { icon: <i className="fab fa-twitter" />, url: "https://twitter.com/johndoe", name: "Twitter" },
        { icon: <i className="fab fa-linkedin" />, url: "https://linkedin.com/in/johndoe", name: "LinkedIn" },
      ],
    },
    {
      imgSrc: "/images/member2.jpg",
      name: "Jane Smith",
      position: "Developer",
      description: "Jane specializes in frontend development.",
      socialLinks: [
        { icon: <i className="fab fa-github" />, url: "https://github.com/janesmith", name: "GitHub" },
      ],
    },
    {
      imgSrc: "/images/member3.jpg",
      name: "Mike Johnson",
      position: "Designer",
      description: "Mike crafts stunning user interfaces.",
      socialLinks: [
        { icon: <i className="fab fa-dribbble" />, url: "https://dribbble.com/mikejohnson", name: "Dribbble" },
      ],
    },
  ];

  return (
    <div className="team">
      <h2 className="team-heading">Meet Our Team</h2>
      <div className="team-members">
        {members.map((member, index) => (
          <ErrorBoundary key={index}>
            <Profile
              imgSrc={member.imgSrc}
              name={member.name}
              position={member.position}
              description={member.description}
              socialLinks={member.socialLinks}
            />
          </ErrorBoundary>
        ))}
      </div>
    </div>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-boundary">An error occurred while loading this profile.</div>;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Team;
