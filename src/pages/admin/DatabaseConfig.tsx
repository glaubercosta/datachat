import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  Database, 
  Plus, 
  Edit, 
  Trash2, 
  TestTube,
  CheckCircle,
  XCircle,
  Server,
  Settings
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface DatabaseConnection {
  id: string
  name: string
  type: 'postgresql' | 'mysql' | 'mongodb' | 'sqlite'
  host: string
  port: number
  database: string
  username: string
  status: 'connected' | 'disconnected' | 'error'
  lastTest: Date
}

export default function DatabaseConfig() {
  const [connections, setConnections] = useState<DatabaseConnection[]>([
    {
      id: '1',
      name: 'Production DB',
      type: 'postgresql',
      host: 'prod-db.example.com',
      port: 5432,
      database: 'llm_config',
      username: 'admin',
      status: 'connected',
      lastTest: new Date()
    },
    {
      id: '2',
      name: 'Analytics DB',
      type: 'mongodb',
      host: 'analytics.example.com',
      port: 27017,
      database: 'analytics',
      username: 'analytics_user',
      status: 'connected',
      lastTest: new Date(Date.now() - 3600000)
    },
    {
      id: '3',
      name: 'Cache DB',
      type: 'mysql',
      host: 'cache.example.com',
      port: 3306,
      database: 'cache',
      username: 'cache_user',
      status: 'error',
      lastTest: new Date(Date.now() - 7200000)
    }
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editConnection, setEditConnection] = useState<DatabaseConnection | null>(null)

  const dbTypes = [
    { value: 'postgresql', label: 'PostgreSQL', icon: '🐘' },
    { value: 'mysql', label: 'MySQL', icon: '🐬' },
    { value: 'mongodb', label: 'MongoDB', icon: '🍃' },
    { value: 'sqlite', label: 'SQLite', icon: '📁' }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'disconnected':
        return <XCircle className="h-4 w-4 text-gray-500" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <XCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      connected: 'default',
      disconnected: 'secondary',
      error: 'destructive'
    } as const
    return variants[status as keyof typeof variants] || 'secondary'
  }

  const testConnection = async (id: string) => {
    // Simulate connection test
    setConnections(prev => prev.map(conn => 
      conn.id === id 
        ? { ...conn, status: 'connected' as const, lastTest: new Date() }
        : conn
    ))
  }

  const DatabaseForm = ({ connection, onSave, onCancel }: {
    connection?: DatabaseConnection | null
    onSave: (connection: Partial<DatabaseConnection>) => void
    onCancel: () => void
  }) => {
    const [formData, setFormData] = useState({
      name: connection?.name || '',
      type: connection?.type || 'postgresql',
      host: connection?.host || '',
      port: connection?.port || 5432,
      database: connection?.database || '',
      username: connection?.username || '',
      password: ''
    })

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Connection Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Production DB"
            />
          </div>
          <div>
            <Label htmlFor="type">Database Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as any }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dbTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <span className="flex items-center gap-2">
                      <span>{type.icon}</span>
                      {type.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <Label htmlFor="host">Host</Label>
            <Input
              id="host"
              value={formData.host}
              onChange={(e) => setFormData(prev => ({ ...prev, host: e.target.value }))}
              placeholder="localhost or database.example.com"
            />
          </div>
          <div>
            <Label htmlFor="port">Port</Label>
            <Input
              id="port"
              type="number"
              value={formData.port}
              onChange={(e) => setFormData(prev => ({ ...prev, port: parseInt(e.target.value) }))}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="database">Database Name</Label>
          <Input
            id="database"
            value={formData.database}
            onChange={(e) => setFormData(prev => ({ ...prev, database: e.target.value }))}
            placeholder="Database name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              placeholder="Database username"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Database password"
            />
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button 
            onClick={() => {
              onSave(formData)
              onCancel()
            }}
            className="flex-1"
          >
            Save Connection
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
          <div className="p-3 rounded-xl bg-gradient-primary">
            <Database className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Database Configuration</h1>
            <p className="text-muted-foreground">Manage your database connections</p>
          </div>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Connection
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Database Connection</DialogTitle>
            </DialogHeader>
            <DatabaseForm 
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
                <p className="text-sm text-muted-foreground">Total Connections</p>
                <p className="text-2xl font-bold text-foreground">{connections.length}</p>
              </div>
              <Server className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-500">
                  {connections.filter(c => c.status === 'connected').length}
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
                <p className="text-sm text-muted-foreground">Errors</p>
                <p className="text-2xl font-bold text-red-500">
                  {connections.filter(c => c.status === 'error').length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">DB Types</p>
                <p className="text-2xl font-bold text-foreground">
                  {new Set(connections.map(c => c.type)).size}
                </p>
              </div>
              <Settings className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connections List */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle>Database Connections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {connections.map((connection) => (
              <div
                key={connection.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-background/70 transition-smooth"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(connection.status)}
                    <span className="text-2xl">
                      {dbTypes.find(t => t.value === connection.type)?.icon}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground">{connection.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {connection.type.toUpperCase()} • {connection.host}:{connection.port}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Last tested: {connection.lastTest.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant={getStatusBadge(connection.status)}>
                    {connection.status}
                  </Badge>
                  
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => testConnection(connection.id)}
                    >
                      <TestTube className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditConnection(connection)}
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
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editConnection} onOpenChange={() => setEditConnection(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Database Connection</DialogTitle>
          </DialogHeader>
          <DatabaseForm 
            connection={editConnection}
            onSave={() => setEditConnection(null)}
            onCancel={() => setEditConnection(null)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}