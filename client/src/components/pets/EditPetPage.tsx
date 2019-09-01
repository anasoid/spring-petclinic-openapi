import * as React from 'react';

import { IEditablePet, IOwner, ISelectOption } from '../../types';

import { url } from '../../util';

import LoadingPanel from './LoadingPanel';
import PetEditor from './PetEditor';

import createPetEditorModel from './createPetEditorModel';

interface IEditPetPageProps {
  params: {
    ownerId: string;
    petId: string;
  };
}

interface IEditPetPageState {
  pet?: IEditablePet;
  owner?: IOwner;
  petTypes?: ISelectOption[];
}

export default class EditPetPage extends React.Component<
  IEditPetPageProps,
  IEditPetPageState
> {
  componentDidMount() {
    const { params } = this.props;

    const fetchUrl = url(`/api/owner/${params.ownerId}/pet/${params.petId}`);

    const loadPetPromise = fetch(fetchUrl).then(response => response.json());

    createPetEditorModel(this.props.params.ownerId, loadPetPromise).then(
      model => this.setState(model)
    );
  }

  render() {
    if (!this.state) {
      return <LoadingPanel />;
    }

    const { pet, owner, petTypes } = this.state;

    if (!pet) {
      return <LoadingPanel />;
    }
    if (!owner) {
      return <LoadingPanel />;
    }
    if (!petTypes) {
      return <LoadingPanel />;
    }

    return <PetEditor pet={pet} owner={owner} petTypes={petTypes} />;
  }
}
