import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlatformButton } from "@/components/ui/platform-button";
import { Platform } from "@shared/schema";
import { useState } from "react";
import { Smile, Hash, AtSign, Upload } from "lucide-react";

const PLATFORMS: Platform[] = ["instagram", "facebook", "twitter", "tiktok", "linkedin"];

export function PostComposer() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(["instagram"]);
  const [content, setContent] = useState("");

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleSubmit = () => {
    // TODO: Implement post creation
    console.log("Creating post:", { content, platforms: selectedPlatforms });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Platform Selection */}
        <div>
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Select Platforms
          </Label>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((platform) => (
              <PlatformButton
                key={platform}
                platform={platform}
                selected={selectedPlatforms.includes(platform)}
                onClick={() => togglePlatform(platform)}
              />
            ))}
          </div>
        </div>

        {/* Content Input */}
        <div>
          <Label htmlFor="content" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Post Content
          </Label>
          <Textarea
            id="content"
            rows={4}
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-primary focus:border-primary resize-none"
          />
        </div>

        {/* Media Upload */}
        <div>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-primary transition-colors">
            <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <p className="text-gray-600 dark:text-gray-400">
              Drag and drop media here, or <span className="text-primary cursor-pointer">browse</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <Smile className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <Hash className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <AtSign className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost">
              Save Draft
            </Button>
            <Button 
              onClick={handleSubmit}
              className="bg-gradient-to-r from-primary to-secondary hover-lift"
            >
              Schedule Post
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
