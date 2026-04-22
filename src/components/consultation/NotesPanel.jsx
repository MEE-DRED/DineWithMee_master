import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  Button, 
  Badge, 
  Input, 
  Label, 
  Textarea, 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue, 
  Checkbox 
} from '../ui';

const NotesPanel = ({ consultationId, patientId, onSave }) => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: [],
    isPrivate: false,
    followUpRequired: false,
    followUpDate: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isSaving, setIsSaving] = useState(false);

  const categories = [
    { id: 'general', name: 'General', color: 'blue' },
    { id: 'assessment', name: 'Assessment', color: 'green' },
    { id: 'treatment', name: 'Treatment Plan', color: 'purple' },
    { id: 'progress', name: 'Progress', color: 'yellow' },
    { id: 'concerns', name: 'Concerns', color: 'red' },
    { id: 'medication', name: 'Medication', color: 'indigo' }
  ];

  const commonTags = [
    'hypertension', 'diabetes', 'weight-loss', 'diet', 'exercise', 
    'medication', 'lifestyle', 'follow-up', 'urgent', 'routine'
  ];

  const mockNotes = [
    {
      id: 1,
      title: 'Initial Assessment',
      content: 'Patient presents with elevated blood pressure (145/90) and BMI of 28.5. Reports recent weight gain of 10lbs over 6 months. Family history includes hypertension and type 2 diabetes. Recommends DASH diet and increased physical activity.',
      category: 'assessment',
      tags: ['hypertension', 'weight-loss', 'assessment'],
      author: 'Dr. Sarah Johnson',
      createdAt: '2024-04-10T10:30:00Z',
      isPrivate: false,
      followUpRequired: true,
      followUpDate: '2024-04-24'
    },
    {
      id: 2,
      title: 'Dietary Recommendations',
      content: 'Discussed Mediterranean diet approach. Patient willing to try reducing sodium intake to <1500mg/day. Provided meal planning resources and recommended consultation with dietitian.',
      category: 'treatment',
      tags: ['diet', 'mediterranean', 'treatment'],
      author: 'Dr. Sarah Johnson',
      createdAt: '2024-04-10T11:00:00Z',
      isPrivate: false,
      followUpRequired: false,
      followUpDate: ''
    },
    {
      id: 3,
      title: 'Progress Check - Week 1',
      content: 'Patient reports adherence to dietary changes. Blood pressure improved to 135/85. Weight loss of 2lbs noted. Motivation remains high. Continue current plan.',
      category: 'progress',
      tags: ['progress', 'hypertension', 'follow-up'],
      author: 'Dr. Sarah Johnson',
      createdAt: '2024-04-17T09:15:00Z',
      isPrivate: false,
      followUpRequired: false,
      followUpDate: ''
    }
  ];

  useEffect(() => {
    setNotes(mockNotes);
  }, []);

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || note.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSaveNote = async () => {
    if (!currentNote.title.trim() || !currentNote.content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newNote = {
      id: Date.now(),
      ...currentNote,
      author: 'Dr. Sarah Johnson',
      createdAt: new Date().toISOString()
    };

    if (isEditing) {
      setNotes(notes.map(note => 
        note.id === editingNoteId ? { ...newNote, id: editingNoteId } : note
      ));
      setIsEditing(false);
      setEditingNoteId(null);
    } else {
      setNotes([...notes, newNote]);
    }

    setCurrentNote({
      title: '',
      content: '',
      category: 'general',
      tags: [],
      isPrivate: false,
      followUpRequired: false,
      followUpDate: ''
    });

    setIsSaving(false);
    
    if (onSave) {
      onSave(newNote);
    }
  };

  const handleEditNote = (note) => {
    setCurrentNote({
      title: note.title,
      content: note.content,
      category: note.category,
      tags: note.tags,
      isPrivate: note.isPrivate,
      followUpRequired: note.followUpRequired,
      followUpDate: note.followUpDate
    });
    setIsEditing(true);
    setEditingNoteId(note.id);
  };

  const handleDeleteNote = (noteId) => {
    if (confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== noteId));
    }
  };

  const toggleTag = (tag) => {
    setCurrentNote(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const exportNotes = () => {
    const exportData = filteredNotes.map(note => ({
      title: note.title,
      content: note.content,
      category: note.category,
      author: note.author,
      date: new Date(note.createdAt).toLocaleDateString(),
      tags: note.tags.join(', ')
    }));

    const csvContent = [
      ['Title', 'Content', 'Category', 'Author', 'Date', 'Tags'],
      ...exportData.map(note => [
        note.title,
        note.content,
        note.category,
        note.author,
        note.date,
        note.tags
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `consultation-notes-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getCategoryColor = (category) => {
    const categoryObj = categories.find(cat => cat.id === category);
    return categoryObj ? categoryObj.color : 'gray';
  };

  const getCategoryBadgeVariant = (category) => {
    const color = getCategoryColor(category);
    switch (color) {
      case 'blue': return 'default';
      case 'green': return 'secondary';
      case 'purple': return 'outline';
      case 'yellow': return 'secondary';
      case 'red': return 'destructive';
      case 'indigo': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Consultation Notes</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportNotes}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setIsEditing(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Note
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Note Editor */}
      {(isEditing || !editingNoteId) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {isEditing ? 'Edit Note' : 'New Note'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="note-title">Title</Label>
              <Input
                id="note-title"
                value={currentNote.title}
                onChange={(e) => setCurrentNote({...currentNote, title: e.target.value})}
                placeholder="Enter note title..."
              />
            </div>

            <div>
              <Label htmlFor="note-content">Content</Label>
              <Textarea
                id="note-content"
                value={currentNote.content}
                onChange={(e) => setCurrentNote({...currentNote, content: e.target.value})}
                placeholder="Enter note content..."
                rows={6}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Select value={currentNote.category} onValueChange={(value) => setCurrentNote({...currentNote, category: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="follow-up-date">Follow-up Date</Label>
                <Input
                  id="follow-up-date"
                  type="date"
                  value={currentNote.followUpDate}
                  onChange={(e) => setCurrentNote({...currentNote, followUpDate: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {commonTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={currentNote.tags.includes(tag) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is-private"
                  checked={currentNote.isPrivate}
                  onCheckedChange={(checked) => setCurrentNote({...currentNote, isPrivate: checked})}
                />
                <Label htmlFor="is-private">Private note</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="follow-up-required"
                  checked={currentNote.followUpRequired}
                  onCheckedChange={(checked) => setCurrentNote({...currentNote, followUpRequired: checked})}
                />
                <Label htmlFor="follow-up-required">Follow-up required</Label>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              {isEditing && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingNoteId(null);
                    setCurrentNote({
                      title: '',
                      content: '',
                      category: 'general',
                      tags: [],
                      isPrivate: false,
                      followUpRequired: false,
                      followUpDate: ''
                    });
                  }}
                >
                  Cancel
                </Button>
              )}
              <Button onClick={handleSaveNote} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Note'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notes List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Notes ({filteredNotes.length})</h2>
        
        {filteredNotes.length > 0 ? (
          filteredNotes.map(note => (
            <Card key={note.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-lg">{note.title}</h3>
                      <Badge variant={getCategoryBadgeVariant(note.category)}>
                        {categories.find(cat => cat.id === note.category)?.name}
                      </Badge>
                      {note.isPrivate && (
                        <Badge variant="outline">Private</Badge>
                      )}
                      {note.followUpRequired && (
                        <Badge variant="destructive">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Follow-up Required
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{note.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                      </div>
                      {note.followUpDate && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Follow-up: {new Date(note.followUpDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-700 mb-3">{note.content}</p>
                    
                    {note.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {note.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditNote(note)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterCategory !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Start by adding your first consultation note.'}
              </p>
              <Button onClick={() => setIsEditing(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Note
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NotesPanel;
