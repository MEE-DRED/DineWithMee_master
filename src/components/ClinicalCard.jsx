import { Link } from 'react-router-dom';

const ClinicalCard = ({ image, title, description, link, icon }) => {
  return (
    <Link to={link} className="group">
      <div className="bg-white rounded-dwm-md shadow-dwm-sm hover:shadow-dwm-md transition-all duration-300 overflow-hidden hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dwm-green-deep/60 to-transparent" />

          {/* Icon */}
          {icon && (
            <div className="absolute top-4 right-4 bg-dwm-gold/90 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center">
              <span className="text-2xl">{icon}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-serif text-2xl font-semibold text-dwm-green-deep mb-3 group-hover:text-dwm-green-mid transition-colors">
            {title}
          </h3>
          <p className="text-dwm-text-mid leading-relaxed mb-4">
            {description}
          </p>
          <div className="flex items-center text-dwm-gold font-medium group-hover:text-dwm-gold-light transition-colors">
            <span>Learn More</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ClinicalCard;
