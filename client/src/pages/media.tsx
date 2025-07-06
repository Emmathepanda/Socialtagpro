import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { MediaFile } from "@shared/schema";
import { Plus, Search, Image as ImageIcon, Video, FileText } from "lucide-react";

export default function Media() {
  const { data: mediaFiles, isLoading } = useQuery<MediaFile[]>({
    queryKey: ["/api/media"],
  });

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return ImageIcon;
    if (mimeType.startsWith('video/')) return Video;
    return FileText;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Media Library</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Store and manage all your media files in one place.
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-secondary">
          <Plus className="h-4 w-4 mr-2" />
          Upload Media
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search media files..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">All Files</Button>
            <Button variant="outline">Images</Button>
            <Button variant="outline">Videos</Button>
          </div>
        </CardContent>
      </Card>

      {/* Media Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {[...Array(12)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-200 dark:bg-gray-600 rounded-lg mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : !mediaFiles || mediaFiles.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No media files</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
              Upload your first media file to get started.
            </p>
            <Button className="bg-gradient-to-r from-primary to-secondary">
              <Plus className="h-4 w-4 mr-2" />
              Upload Media
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {mediaFiles.map((file) => {
            const FileIcon = getFileIcon(file.mimeType);
            return (
              <Card key={file.id} className="hover-lift cursor-pointer">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                    {file.mimeType.startsWith('image/') ? (
                      <img 
                        src={file.url} 
                        alt={file.originalName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FileIcon className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate" title={file.originalName}>
                    {file.originalName}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(file.size)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
