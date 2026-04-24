import React from 'react';

const HealthTags = ({ tags, variant = 'meal', className = '', maxVisible = 3 }) => {
  if (!tags || tags.length === 0) return null;

  const visibleTags = tags.slice(0, maxVisible);
  const remainingCount = tags.length - maxVisible;

  const getTagStyles = () => {
    switch (variant) {
      case 'meal':
        return 'px-2 py-1 bg-dwm-green-pale text-dwm-green-mid text-xs rounded-full';
      case 'ingredient':
        return 'px-2 py-1 bg-dwm-gold-light text-dwm-gold-dark text-xs rounded-full';
      case 'condition':
        return 'px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200';
      default:
        return 'px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full';
    }
  };

  const getTagIcon = (tag) => {
    const tagStr = typeof tag === 'object' ? tag?.name || tag?.label : tag;
    const lowerTag = tagStr.toLowerCase();
    
    if (lowerTag.includes('diabetes') || lowerTag.includes('blood sugar')) return '🩺';
    if (lowerTag.includes('heart') || lowerTag.includes('cardio') || lowerTag.includes('blood pressure')) return '❤️';
    if (lowerTag.includes('pregnancy') || lowerTag.includes('maternal') || lowerTag.includes('fetal')) return '🤰';
    if (lowerTag.includes('weight') || lowerTag.includes('obesity') || lowerTag.includes('fat')) return '⚖️';
    if (lowerTag.includes('iron') || lowerTag.includes('blood') || lowerTag.includes('anemia')) return '🩸';
    if (lowerTag.includes('fiber') || lowerTag.includes('digestion')) return '🌾';
    if (lowerTag.includes('protein') || lowerTag.includes('muscle')) return '💪';
    if (lowerTag.includes('energy') || lowerTag.includes('calories')) return '⚡';
    if (lowerTag.includes('immune') || lowerTag.includes('immunity')) return '🛡️';
    if (lowerTag.includes('bone') || lowerTag.includes('calcium')) return '🦴';
    if (lowerTag.includes('brain') || lowerTag.includes('cognitive')) return '🧠';
    if (lowerTag.includes('skin') || lowerTag.includes('hair')) return '✨';
    if (lowerTag.includes('anti-inflammatory')) return '🌿';
    if (lowerTag.includes('antioxidant')) return '🔬';
    
    return '•';
  };

  const formatTagText = (tag) => {
    if (typeof tag === 'object') {
      return tag?.name || tag?.label || 'Unknown';
    }
    return tag;
  };

  const getTagDescription = (tag) => {
    const tagStr = typeof tag === 'object' ? tag?.name || tag?.label : tag;
    const lowerTag = tagStr.toLowerCase();
    
    if (lowerTag.includes('diabetes')) return 'Helps manage blood sugar levels';
    if (lowerTag.includes('heart')) return 'Supports cardiovascular health';
    if (lowerTag.includes('pregnancy')) return 'Safe and beneficial during pregnancy';
    if (lowerTag.includes('weight')) return 'Supports healthy weight management';
    if (lowerTag.includes('iron')) return 'Rich in iron for blood health';
    if (lowerTag.includes('fiber')) return 'High in dietary fiber';
    if (lowerTag.includes('protein')) return 'Excellent protein source';
    if (lowerTag.includes('energy')) return 'Provides sustained energy';
    if (lowerTag.includes('immune')) return 'Boosts immune system';
    if (lowerTag.includes('bone')) return 'Supports bone health';
    
    return 'Health benefit';
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {visibleTags.map((tag, index) => (
        <span
          key={index}
          className={`${getTagStyles()} inline-flex items-center gap-1 cursor-help transition-colors hover:opacity-80`}
          title={getTagDescription(tag)}
        >
          <span className="text-xs">{getTagIcon(tag)}</span>
          {formatTagText(tag)}
        </span>
      ))}
      
      {remainingCount > 0 && (
        <span
          className={`${getTagStyles()}`}
          title={`${remainingCount} more health benefits`}
        >
          +{remainingCount} more
        </span>
      )}
    </div>
  );
};

export default HealthTags;
