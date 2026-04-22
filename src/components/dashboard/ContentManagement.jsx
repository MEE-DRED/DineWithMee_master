import React from 'react';

const ContentManagement = ({ content }) => {
  const mockContent = [
    {
      id: '1',
      title: 'Managing Hypertension Through Diet',
      type: 'ARTICLE',
      status: 'PUBLISHED',
      author: 'Dr. Sarah Johnson',
      views: 1247,
      publishedAt: '2024-12-01'
    },
    {
      id: '2',
      title: 'Diabetes-Friendly Meal Planning',
      type: 'RECIPE',
      status: 'PENDING_REVIEW',
      author: 'Chef Michael Chen',
      views: 892,
      publishedAt: null
    },
    {
      id: '3',
      title: 'Understanding Blood Pressure Medications',
      type: 'VIDEO',
      status: 'PUBLISHED',
      author: 'Dr. Emily Wilson',
      views: 2156,
      publishedAt: '2024-11-28'
    },
    {
      id: '4',
      title: 'Heart-Healthy African Recipes',
      type: 'INFOGRAPHIC',
      status: 'DRAFT',
      author: 'Nutrition Team',
      views: 0,
      publishedAt: null
    }
  ];

  const getTypeBadge = (type) => {
    const types = {
      'ARTICLE': { color: 'blue', text: 'Article' },
      'RECIPE': { color: 'green', text: 'Recipe' },
      'VIDEO': { color: 'purple', text: 'Video' },
      'INFOGRAPHIC': { color: 'orange', text: 'Infographic' },
      'BLOG_POST': { color: 'pink', text: 'Blog' }
    };
    return types[type] || { color: 'gray', text: 'Unknown' };
  };

  const getStatusBadge = (status) => {
    const statuses = {
      'PUBLISHED': { color: 'green', text: 'Published' },
      'PENDING_REVIEW': { color: 'yellow', text: 'Pending Review' },
      'DRAFT': { color: 'gray', text: 'Draft' },
      'REJECTED': { color: 'red', text: 'Rejected' }
    };
    return statuses[status] || { color: 'gray', text: 'Unknown' };
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium text-dwm-green-deep">Content Management</h4>
        <div className="flex space-x-2">
          <button className="btn-primary text-sm">
            Create Content
          </button>
          <button className="btn-secondary text-sm">
            View All
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {mockContent.map((item) => {
          const typeBadge = getTypeBadge(item.type);
          const statusBadge = getStatusBadge(item.status);
          
          return (
            <div key={item.id} className="p-4 bg-dwm-green-pale rounded-lg hover:bg-dwm-green-light transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h5 className="font-medium text-dwm-green-deep">
                      {item.title}
                    </h5>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${typeBadge.color}-100 text-${typeBadge.color}-800`}>
                      {typeBadge.text}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${statusBadge.color}-100 text-${statusBadge.color}-800`}>
                      {statusBadge.text}
                    </span>
                  </div>
                  
                  <div className="text-sm text-dwm-text-mid mb-2">
                    By {item.author}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-dwm-text-mid">
                    <div className="flex items-center space-x-1">
                      <div className="text-lg"></div>
                      <span>{item.views.toLocaleString()} views</span>
                    </div>
                    {item.publishedAt && (
                      <div>
                        Published {new Date(item.publishedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button className="btn-secondary text-xs">
                    Edit
                  </button>
                  <button className="btn-secondary text-xs">
                    Preview
                  </button>
                  {item.status === 'PENDING_REVIEW' && (
                    <button className="btn-primary text-xs">
                      Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-green-50 rounded">
            <div className="text-lg font-bold text-green-600">12</div>
            <div className="text-xs text-green-800">Published</div>
          </div>
          <div className="p-3 bg-yellow-50 rounded">
            <div className="text-lg font-bold text-yellow-600">5</div>
            <div className="text-xs text-yellow-800">Pending Review</div>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <div className="text-lg font-bold text-gray-600">8</div>
            <div className="text-xs text-gray-800">Drafts</div>
          </div>
          <div className="p-3 bg-blue-50 rounded">
            <div className="text-lg font-bold text-blue-600">4.2K</div>
            <div className="text-xs text-blue-800">Total Views</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;
