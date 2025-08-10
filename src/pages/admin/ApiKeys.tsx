import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  Key, 
  Plus, 
  Edit, 
  Trash2, 
  TestTube,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Shield,
  AlertTriangle,
  Settings
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ApiKey {
  id: string
  name: string
  provider: 'openai' | 'anthropic' | 'google' | 'cohere' | 'huggingface'
  key: string
  status: 'active' | 'inactive' | 'error'
  lastUsed: Date
  usageLimit?: number
  usageCount: number
  createdAt: Date
}

export default function ApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'OpenAI Production',
      provider: 'openai',
      key: 'sk-••••••••••••••••••••••••••••••••••••••••',
      status: 'active',
      lastUsed: new Date(),
      usageLimit: 10000,
      usageCount: 2847,
      createdAt: new Date(Date.now() - 86400000 * 7)
    },
    {
      id: '2',
      name: 'Anthropic Claude',
      provider: 'anthropic',
      key: 'sk-ant-••••••••••••••••••••••••••••••••••',
      status: 'active',
      lastUsed: new Date(Date.now() - 3600000),
      usageCount: 1234,
      createdAt: new Date(Date.now() - 86400000 * 14)
    },
    {
      id: '3',
      name: 'Google AI',
      provider: 'google',
      key: 'AIza••••••••••••••••••••••••••••••••••••',
      status: 'error',
      lastUsed: new Date(Date.now() - 86400000),
      usageCount: 456,
      createdAt: new Date(Date.now() - 86400000 * 30)
    }
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editKey, setEditKey] = useState<ApiKey | null>(null)
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})

  const providers = [
    { value: 'openai', label: 'OpenAI', icon: '🤖', color: 'bg-green-500' },
    { value: 'anthropic', label: 'Anthropic', icon: '🧠', color: 'bg-orange-500' },
    { value: 'google', label: 'Google AI', icon: '🟦', color: 'bg-blue-500' },
    { value: 'cohere', label: 'Cohere', icon: '🔗', color: 'bg-purple-500' },
    { value: 'huggingface', label: 'Hugging Face', icon: '🤗', color: 'bg-yellow-500' }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'inactive':
        return <XCircle className="h-4 w-4 text-gray-500" />
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <XCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'default',
      inactive: 'secondary',
      error: 'destructive'
    } as const
    return variants[status as keyof typeof variants] || 'secondary'
  }

  const toggleKeyVisibility = (id: string) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const testApiKey = async (id: string) => {
    // Simulate API key test
    setApiKeys(prev => prev.map(key => 
      key.id === id 
        ? { ...key, status: 'active' as const, lastUsed: new Date() }
        : key
    ))
  }

  const ApiKeyForm = ({ apiKey, onSave, onCancel }: {
    apiKey?: ApiKey | null
    onSave: (apiKey: Partial<ApiKey>) => void
    onCancel: () => void
  }) => {
    const [formData, setFormData] = useState({
      name: apiKey?.name || '',
      provider: apiKey?.provider || 'openai',
      key: apiKey?.key || '',
      usageLimit: apiKey?.usageLimit || 10000
    })

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Key Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., OpenAI Production"
            />
          </div>
          <div>
            <Label htmlFor="provider">Provider</Label>
            <Select value={formData.provider} onValueChange={(value) => setFormData(prev => ({ ...prev, provider: value as any }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {providers.map((provider) => (
                  <SelectItem key={provider.value} value={provider.value}>
                    <span className="flex items-center gap-2">
                      <span>{provider.icon}</span>
                      {provider.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label htmlFor="key">API Key</Label>
          <Textarea
            id="key"
            value={formData.key}
            onChange={(e) => setFormData(prev => ({ ...prev, key: e.target.value }))}
            placeholder="Enter your API key..."
            className="font-mono text-sm"
            rows={3}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Your API key will be encrypted and stored securely
          </p>
        </div>

        <div>
          <Label htmlFor="usageLimit">Usage Limit (requests/month)</Label>
          <Input
            id="usageLimit"
            type="number"
            value={formData.usageLimit}
            onChange={(e) => setFormData(prev => ({ ...prev, usageLimit: parseInt(e.target.value) }))}
            placeholder="10000"
          />
        </div>

        <div className="flex gap-2 pt-4">
          <Button 
            onClick={() => {
              onSave(formData)
              onCancel()
            }}
            className="flex-1"
          >
            Save API Key
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-accent">
            <Key className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">API Key Management</h1>
            <p className="text-muted-foreground">Manage your LLM provider API keys</p>
          </div>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="gap-2">
              <Plus className="h-4 w-4" />
              Add API Key
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add API Key</DialogTitle>
            </DialogHeader>
            <ApiKeyForm 
              onSave={() => setIsAddDialogOpen(false)}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Keys</p>
                <p className="text-2xl font-bold text-foreground">{apiKeys.length}</p>
              </div>
              <Key className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-500">
                  {apiKeys.filter(k => k.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Usage</p>
                <p className="text-2xl font-bold text-accent">
                  {apiKeys.reduce((sum, key) => sum + key.usageCount, 0).toLocaleString()}
                </p>
              </div>
              <Shield className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Providers</p>
                <p className="text-2xl font-bold text-foreground">
                  {new Set(apiKeys.map(k => k.provider)).size}
                </p>
              </div>
              <Settings className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Keys List */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiKeys.map((apiKey) => {
              const provider = providers.find(p => p.value === apiKey.provider)
              return (
                <div
                  key={apiKey.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-background/70 transition-smooth"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(apiKey.status)}
                      <div className={`w-10 h-10 rounded-lg ${provider?.color} flex items-center justify-center text-white font-bold`}>
                        {provider?.icon}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground">{apiKey.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {provider?.label} • Created {apiKey.createdAt.toLocaleDateString()}
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-2">
                          <code className="text-xs bg-background px-2 py-1 rounded font-mono">
                            {showKeys[apiKey.id] ? apiKey.key : apiKey.key.replace(/./g, '•')}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleKeyVisibility(apiKey.id)}
                            className="h-6 w-6 p-0"
                          >
                            {showKeys[apiKey.id] ? (
                              <EyeOff className="h-3 w-3" />
                            ) : (
                              <Eye className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                        {apiKey.usageLimit && (
                          <div className="text-xs text-muted-foreground">
                            Usage: {apiKey.usageCount.toLocaleString()}/{apiKey.usageLimit.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge variant={getStatusBadge(apiKey.status)}>
                      {apiKey.status}
                    </Badge>
                    
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => testApiKey(apiKey.id)}
                      >
                        <TestTube className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditKey(apiKey)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editKey} onOpenChange={() => setEditKey(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit API Key</DialogTitle>
          </DialogHeader>
          <ApiKeyForm 
            apiKey={editKey}
            onSave={() => setEditKey(null)}
            onCancel={() => setEditKey(null)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}