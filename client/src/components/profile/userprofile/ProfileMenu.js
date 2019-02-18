import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditProfileModal from '../EditProfileModal';

class ProfileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: ''
    };
  }

  render() {
    const {
      profileId,
      name,
      position,
      organisation,
      twitter,
      linkedin,
      bio,
      interestOne,
      interestTwo,
      interestThree
    } = this.props;
    return (
      <div className="text-right mt-0 mr-2">
        <Link
          className="far fa-edit mr-2 text-white"
          data-toggle="modal"
          data-target="#EditProfileModal"
          to="#"
        />
        <EditProfileModal
          profileId={profileId}
          name={name}
          position={position}
          organisation={organisation}
          interestOne={interestOne}
          interestTwo={interestTwo}
          interestThree={interestThree}
          twitter={twitter}
          linkedin={linkedin}
          bio={bio}
        />
      </div>
    );
  }
}

export default ProfileMenu;
