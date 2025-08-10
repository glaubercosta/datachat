import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { 
  Brain, 
  Settings, 
  Zap,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Star
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LLMModel {
  id: string
  name: string
  provider: string
  version: string
  contextLength: number
  costPer1k: number
  enabled: boolean
  isDefault: boolean
  config: {
    temperature: number
    maxTokens: number
    topP: number
    frequencyPenalty: number
    presencePenalty: number
  }
}

export default function Models() {
  const [models, setModels] = useState<LLMModel[]>([
    {
      id: 'gpt-4',
      name: 'GPT-4',
      provider: 'OpenAI',
      version: 'gpt-4-0125-preview',
      contextLength: 128000,
      costPer1k: 0.03,
      enabled: true,
      isDefault: true,
      config: {
        temperature: 0.7,
        maxTokens: 4096,
        topP: 1.0,
        frequencyPenalty: 0,
        presencePenalty: 0
      }
    },
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      provider: 'OpenAI',
      version: 'gpt-3.5-turbo-0125',
      contextLength: 16385,
      costPer1k: 0.001,
      enabled: true,
      isDefault: false,
      config: {
        temperature: 0.7,
        maxTokens: 4096,
        topP: 1.0,
        frequencyPenalty: 0,
        presencePenalty: 0
      }
    },
    {
      id: 'claude-3',
      name: 'Claude 3 Opus',
      provider: 'Anthropic',
      version: 'claude-3-opus-20240229',
      contextLength: 200000,
      costPer1k: 0.075,
      enabled: true,
      isDefault: false,
      config: {
        temperature: 0.7,
        maxTokens: 4096,
        topP: 1.0,
        frequencyPenalty: 0,
        presencePenalty: 0
      }
    }
  ])

  const [selectedModel, setSelectedModel] = useState<LLMModel>(models[0])

  const updateModelConfig = (modelId: string, config: Partial<LLMModel['config']>) => {
    setModels(prev => prev.map(model =>
      model.id === modelId
        ? { ...model, config: { ...model.config, ...config } }
        : model
    ))
    if (selectedModel.id === modelId) {
      setSelectedModel(prev => ({ ...prev, config: { ...prev.config, ...config } }))
    }
  }

  const toggleModelEnabled = (modelId: string) => {
    setModels(prev => prev.map(model =>
      model.id === modelId
        ? { ...model, enabled: !model.enabled }
        : model
    ))
  }

  const setDefaultModel = (modelId: string) => {
    setModels(prev => prev.map(model => ({
      ...model,
      isDefault: model.id === modelId
    })))
  }

  const getProviderColor = (provider: string) => {
    const colors = {
      'OpenAI': 'bg-green-500',
      'Anthropic': 'bg-orange-500',
      'Google': 'bg-blue-500',
      'Meta': 'bg-purple-500'
    }
    return colors[provider as keyof typeof colors] || 'bg-gray-500'
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-primary">
            <Brain className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">LLM Models</h1>
            <p className="text-muted-foreground">Configure your AI models and parameters</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Models</p>
                <p className="text-2xl font-bold text-foreground">{models.length}</p>
              </div>
              <Brain className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Models</p>
                <p className="text-2xl font-bold text-green-500">
                  {models.filter(m => m.enabled).length}
                </p>
              </div>
              <Zap className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Cost/1K</p>
                <p className="text-2xl font-bold text-accent">
                  ${(models.reduce((sum, m) => sum + m.costPer1k, 0) / models.length).toFixed(3)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Providers</p>
                <p className="text-2xl font-bold text-foreground">
                  {new Set(models.map(m => m.provider)).size}
                </p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Models List */}
        <div className="lg:col-span-1">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Available Models</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {models.map((model) => (
                <div
                  key={model.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-smooth ${
                    selectedModel.id === model.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border/50 bg-background/50 hover:bg-background/70'
                  }`}
                  onClick={() => setSelectedModel(model)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg ${getProviderColor(model.provider)} flex items-center justify-center text-white font-bold text-sm`}>
                        {model.provider[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground truncate">{model.name}</h4>
                        <p className="text-xs text-muted-foreground truncate">{model.version}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {(model.contextLength / 1000).toFixed(0)}K context
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            ${model.costPer1k}/1K
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {model.isDefault && (
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      )}
                      <Switch
                        checked={model.enabled}
                        onCheckedChange={() => toggleModelEnabled(model.id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Model Configuration */}
        <div className="lg:col-span-2">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configure {selectedModel.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="parameters" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="parameters">Parameters</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="parameters" className="space-y-6 mt-6">
                  {/* Temperature */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-sm font-medium">Temperature</Label>
                      <span className="text-sm text-muted-foreground">{selectedModel.config.temperature}</span>
                    </div>
                    <Slider
                      value={[selectedModel.config.temperature]}
                      onValueChange={([value]) => updateModelConfig(selectedModel.id, { temperature: value })}
                      min={0}
                      max={2}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Lower values make output more focused, higher values more creative
                    </p>
                  </div>

                  {/* Max Tokens */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Max Tokens</Label>
                    <Input
                      type="number"
                      value={selectedModel.config.maxTokens}
                      onChange={(e) => updateModelConfig(selectedModel.id, { maxTokens: parseInt(e.target.value) })}
                      min={1}
                      max={selectedModel.contextLength}
                    />
                    <p className="text-xs text-muted-foreground">
                      Maximum number of tokens to generate in response
                    </p>
                  </div>

                  {/* Top P */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-sm font-medium">Top P</Label>
                      <span className="text-sm text-muted-foreground">{selectedModel.config.topP}</span>
                    </div>
                    <Slider
                      value={[selectedModel.config.topP]}
                      onValueChange={([value]) => updateModelConfig(selectedModel.id, { topP: value })}
                      min={0}
                      max={1}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Nucleus sampling parameter
                    </p>
                  </div>

                  {/* Frequency Penalty */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-sm font-medium">Frequency Penalty</Label>
                      <span className="text-sm text-muted-foreground">{selectedModel.config.frequencyPenalty}</span>
                    </div>
                    <Slider
                      value={[selectedModel.config.frequencyPenalty]}
                      onValueChange={([value]) => updateModelConfig(selectedModel.id, { frequencyPenalty: value })}
                      min={-2}
                      max={2}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Reduces repetition of tokens
                    </p>
                  </div>

                  {/* Presence Penalty */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-sm font-medium">Presence Penalty</Label>
                      <span className="text-sm text-muted-foreground">{selectedModel.config.presencePenalty}</span>
                    </div>
                    <Slider
                      value={[selectedModel.config.presencePenalty]}
                      onValueChange={([value]) => updateModelConfig(selectedModel.id, { presencePenalty: value })}
                      min={-2}
                      max={2}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">
                      Encourages talking about new topics
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50">
                      <div>
                        <h4 className="font-medium text-foreground">Enable Model</h4>
                        <p className="text-sm text-muted-foreground">Allow this model to be used in chat</p>
                      </div>
                      <Switch
                        checked={selectedModel.enabled}
                        onCheckedChange={() => toggleModelEnabled(selectedModel.id)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50">
                      <div>
                        <h4 className="font-medium text-foreground">Set as Default</h4>
                        <p className="text-sm text-muted-foreground">Use this model by default for new chats</p>
                      </div>
                      <Button
                        variant={selectedModel.isDefault ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDefaultModel(selectedModel.id)}
                        disabled={selectedModel.isDefault}
                      >
                        {selectedModel.isDefault ? 'Default' : 'Set Default'}
                      </Button>
                    </div>

                    <div className="p-4 rounded-lg border border-border/50 bg-background/50">
                      <h4 className="font-medium text-foreground mb-3">Model Information</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Provider:</span>
                          <span className="ml-2 font-medium">{selectedModel.provider}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Version:</span>
                          <span className="ml-2 font-mono text-xs">{selectedModel.version}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Context Length:</span>
                          <span className="ml-2 font-medium">{selectedModel.contextLength.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Cost per 1K tokens:</span>
                          <span className="ml-2 font-medium">${selectedModel.costPer1k}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2 mt-6 pt-6 border-t border-border/10">
                <Button className="flex-1">
                  Save Configuration
                </Button>
                <Button variant="outline">
                  Reset to Defaults
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}