import { Link } from 'react-router-dom';

interface ResidentsProps {
  resident: PickedCharacter;
}

const ResidentCard = ({ resident }: ResidentsProps) => (
  <Link to={`resident/${resident.id}`}>
    <div
      data-testid="resident-card"
      className="block h-full text-white border-2 rounded-lg cursor-pointer hover:bg-white transition duration-100 hover:border-ink hover:text-black bg-ink"
    >
      <img
        className="rounded-t-lg"
        src={resident.image}
        alt={resident.name}
        data-testid="resident-image"
      />
      <div className="p-2">
        <div className="font-bold" data-testid="resident-name">
          {resident.name}
        </div>
        <div data-testid="resident-status">
          {resident.status} - {resident.species}
        </div>
      </div>
    </div>
  </Link>
);

export default ResidentCard;
