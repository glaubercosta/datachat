import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { 
  Brain, 
  Settings, 
  Zap,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Star,
  CheckCircle,
  AlertTriangle,
  BarChart3
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts'

interface LLMModel {
  id: string
  name: string
  provider: string
  version: string
  contextLength: number
  costPer1k: number
  enabled: boolean
  isDefault: boolean
  status: 'healthy' | 'warning' | 'error'
  responseTime: number
  usage: number
  accuracy: number
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
      status: 'healthy',
      responseTime: 1.2,
      usage: 87,
      accuracy: 94.5,
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
      status: 'healthy',
      responseTime: 0.8,
      usage: 92,
      accuracy: 89.2,
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
      status: 'warning',
      responseTime: 1.8,
      usage: 65,
      accuracy: 96.1,
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

  const performanceData = [
    { time: '09:00', gpt4: 1.2, gpt35: 0.8, claude: 1.8 },
    { time: '10:00', gpt4: 1.1, gpt35: 0.7, claude: 1.9 },
    { time: '11:00', gpt4: 1.3, gpt35: 0.9, claude: 1.7 },
    { time: '12:00', gpt4: 1.4, gpt35: 1.0, claude: 2.0 },
    { time: '13:00', gpt4: 1.2, gpt35: 0.8, claude: 1.6 },
    { time: '14:00', gpt4: 1.1, gpt35: 0.7, claude: 1.8 }
  ]

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-gray-500" />
    }
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
            <h1 className="text-2xl font-bold text-foreground">LLM Models Dashboard</h1>
            <p className="text-muted-foreground">Monitor and configure your AI models</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Model Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {models.map((model) => (
              <Card key={model.id} className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-smooth">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg ${getProviderColor(model.provider)} flex items-center justify-center text-white font-bold text-xs`}>
                        {model.provider[0]}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{model.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">{model.provider}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {model.isDefault && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                      {getStatusIcon(model.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Response Time</span>
                      <div className="font-medium">{model.responseTime}s</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Accuracy</span>
                      <div className="font-medium">{model.accuracy}%</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Usage</span>
                      <span className="font-medium">{model.usage}%</span>
                    </div>
                    <Progress value={model.usage} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Badge variant={model.enabled ? 'default' : 'secondary'}>
                      {model.enabled ? 'Active' : 'Inactive'}
                    </Badge>
                    <Switch
                      checked={model.enabled}
                      onCheckedChange={() => toggleModelEnabled(model.id)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stats */}
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
                    <p className="text-sm text-muted-foreground">Avg Response</p>
                    <p className="text-2xl font-bold text-accent">
                      {(models.reduce((sum, m) => sum + m.responseTime, 0) / models.length).toFixed(1)}s
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Accuracy</p>
                    <p className="text-2xl font-bold text-purple-500">
                      {(models.reduce((sum, m) => sum + m.accuracy, 0) / models.length).toFixed(1)}%
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Chart */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Response Time Trends (Last 6 Hours)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="gpt4" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="GPT-4"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="gpt35" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    name="GPT-3.5"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="claude" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={2}
                    name="Claude"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {models.map((model) => (
              <Card key={model.id} className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <div className={`w-6 h-6 rounded ${getProviderColor(model.provider)} flex items-center justify-center text-white text-xs font-bold`}>
                      {model.provider[0]}
                    </div>
                    {model.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <span className="text-muted-foreground">Response Time</span>
                      <div className="text-lg font-semibold">{model.responseTime}s</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-muted-foreground">Accuracy</span>
                      <div className="text-lg font-semibold">{model.accuracy}%</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-muted-foreground">Cost/1K</span>
                      <div className="text-lg font-semibold">${model.costPer1k}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-muted-foreground">Context</span>
                      <div className="text-lg font-semibold">{(model.contextLength / 1000).toFixed(0)}K</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="configuration" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Models List */}
            <div className="lg:col-span-1">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>Select Model</CardTitle>
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
        </TabsContent>
      </Tabs>
    </div>
  )
}