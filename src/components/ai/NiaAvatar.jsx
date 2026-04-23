const NiaAvatar = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-2xl',
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-dwm-gold to-dwm-gold-light flex items-center justify-center shadow-dwm-md relative`}>
      <span className="text-white font-serif font-bold">N</span>
      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
    </div>
  );
};

export default NiaAvatar;
