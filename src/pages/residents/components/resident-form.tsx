import { useState } from 'react';
import { toast } from 'react-toastify';
import NoteApi from '../../../services/note-api';

interface ResidentsProps {
  resident: Character | null;
}

const noteApi = new NoteApi();

const ResidentForm = ({ resident }: ResidentsProps) => {
  const [noteValue, setNoteValue] = useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteValue(e.target.value);
  };

  const handleOnSubmit = async () => {
    try {
      await noteApi.createNote({
        title: `${resident?.name} Note`,
        body: noteValue,
        userId: resident?.id ?? 0,
      });
      toast.success('Note created successfully', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } finally {
      setNoteValue('');
    }
  };

  return resident ? (
    <div className="block text-black bg-white border-2 rounded-lg w-100 transition duration-100">
      <img
        className="p-4 mx-auto rounded-full"
        src={resident.image}
        alt={resident.name}
      />
      <div className="p-2">
        <div className="text-xl font-bold">{resident.name}</div>
        <div className="pb-2">
          <span className="text-sm text-gray-500 font-small">Status:</span>
          <br />
          {resident.status}
        </div>
        <div className="pb-2">
          <span className="text-sm text-gray-500 font-small">Species:</span>
          <br />
          {resident.species}
        </div>
        <div className="pb-2">
          <span className="text-sm text-gray-500 font-small">Type:</span>
          <br />
          {resident.type}
        </div>
        <div className="pb-2">
          <span className="text-sm text-gray-500 font-small">Gender:</span>
          <br />
          {resident.gender}
        </div>
        <div className="pb-2">
          <span className="text-sm text-gray-500 font-small">Origin:</span>
          <br />
          {resident.origin.name}
        </div>
        <div className="pb-2">
          <span className="text-sm text-gray-500 font-small">Location:</span>
          <br />
          {resident.location.name}
        </div>
        <div className="pb-2">
          <span className="text-sm text-gray-500 font-small">
            First Appearance:
          </span>
          <br />
          Episode {resident.episode[0].split('/episode/')[1]}
        </div>
        <div className="flex flex-wrap">
          <div className="w-full mb-6">
            <label
              className="text-sm text-gray-500 font-small"
              htmlFor="form-message"
            >
              Notes:
              <textarea
                value={noteValue}
                onChange={handleOnChange}
                data-testid="form-input-notes"
                id="form-message"
                className="block w-full mt-2 leading-tight text-black border border-gray-200 rounded appearance-none resize transition duration-200 ease-in-out focus:border-tangerine-600 focus:ring-1 focus:ring-tangerine-600 focus:border-none form-textarea"
                rows={10}
              />
            </label>
          </div>
        </div>
        <button
          data-testid="form-submit-button"
          type="button"
          disabled={!noteValue}
          onClick={() => handleOnSubmit()}
          className="float-right w-full p-2 text-base font-bold text-white border-2 rounded-lg hover:border-ink hover:text-ink hover:bg-white transition duration-100 focus:ring-1 focus:ring-tangerine-600 focus:border-none bg-ink duration-200"
        >
          Submit
        </button>
      </div>
    </div>
  ) : null;
};

export default ResidentForm;
