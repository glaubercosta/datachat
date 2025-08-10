import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Database, Key, Brain, Users, Activity, TrendingUp, Zap, ArrowUp, ArrowDown, Clock, DollarSign, CheckCircle, AlertTriangle, XCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

export default function Dashboard() {
  const realTimeData = [
    { time: '09:00', requests: 120, users: 15 },
    { time: '10:00', requests: 180, users: 22 },
    { time: '11:00', requests: 240, users: 18 },
    { time: '12:00', requests: 320, users: 35 },
    { time: '13:00', requests: 280, users: 28 },
    { time: '14:00', requests: 350, users: 42 }
  ]

  const systemHealth = [
    { name: 'Gateway API', status: 'healthy', uptime: 99.9, response: '145ms' },
    { name: 'Database', status: 'healthy', uptime: 99.8, response: '23ms' },
    { name: 'Models LLM', status: 'warning', uptime: 98.5, response: '1.2s' },
    { name: 'Cache', status: 'healthy', uptime: 99.7, response: '8ms' }
  ]

  const resourceUsage = [
    { name: 'Uso de CPU', value: 65, max: 100, color: 'bg-blue-500' },
    { name: 'Memória', value: 78, max: 100, color: 'bg-green-500' },
    { name: 'Armazenamento', value: 42, max: 100, color: 'bg-purple-500' },
    { name: 'Largura de Banda', value: 89, max: 100, color: 'bg-orange-500' }
  ]

  const stats = [
    {
      title: "Requisições Ativas",
      value: "1,284",
      change: "+12%",
      icon: MessageSquare,
      color: "text-blue-500",
      trend: "up"
    },
    {
      title: "Models Online",
      value: "8/10",
      change: "2 offline",
      icon: Brain,
      color: "text-purple-500",
      trend: "warning"
    },
    {
      title: "Requisições/min",
      value: "847",
      change: "+18%",
      icon: Activity,
      color: "text-green-500",
      trend: "up"
    },
    {
      title: "Usuários Ativos",
      value: "156",
      change: "+5%",
      icon: Users,
      color: "text-orange-500",
      trend: "up"
    },
    {
      title: "Tempo de Resposta",
      value: "1.2s",
      change: "-8%",
      icon: Clock,
      color: "text-cyan-500",
      trend: "down"
    },
    {
      title: "Custo Hoje",
      value: "$247.80",
      change: "+12%",
      icon: DollarSign,
      color: "text-yellow-500",
      trend: "up"
    }
  ]

  const quickActions = [
    {
      title: "Iniciar Chat",
      description: "Comece uma conversa com seu assistente AI",
      icon: MessageSquare,
      href: "/chat",
      color: "bg-gradient-primary"
    },
    {
      title: "Configurar Database",
      description: "Configure ou modifique conexões de banco de dados",
      icon: Database,
      href: "/admin/database",
      color: "bg-gradient-accent"
    },
    {
      title: "Gerenciar Chaves API",
      description: "Atualize as credenciais dos seus provedores LLM",
      icon: Key,
      href: "/admin/api-keys",
      color: "bg-gradient-secondary"
    },
    {
      title: "Configurações de Model",
      description: "Configure models AI e parâmetros",
      icon: Brain,
      href: "/admin/models",
      color: "bg-gradient-primary"
    }
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Clean Hero Section */}
      <div className="relative overflow-hidden rounded-xl border bg-card p-8">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-2xl font-semibold text-foreground">Bem-vindo de volta</h1>
            </div>
            <p className="text-muted-foreground">Gerencie seus models AI e infraestrutura</p>
          </div>
          <div className="flex gap-3">
            <Button size="sm" asChild>
              <Link to="/chat">
                <MessageSquare className="h-4 w-4 mr-2" />
                Iniciar Chat
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/models">
                <Brain className="h-4 w-4 mr-2" />
                Models
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Real-time Overview */}
      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="metrics">Métricas ao Vivo</TabsTrigger>
          <TabsTrigger value="health">Saúde do Sistema</TabsTrigger>
          <TabsTrigger value="resources">Recursos</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-6">
          {/* Live Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <Card key={stat.title} className="border shadow-clean hover:shadow-clean-md transition-all duration-200" style={{ animationDelay: `${index * 50}ms` }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    {stat.trend === 'up' && <ArrowUp className="h-3 w-3 text-green-600" />}
                    {stat.trend === 'down' && <ArrowDown className="h-3 w-3 text-green-600" />}
                    {stat.trend === 'warning' && <AlertTriangle className="h-3 w-3 text-amber-500" />}
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-semibold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <span className={
                      stat.trend === 'up' ? "text-green-600" : 
                      stat.trend === 'down' ? "text-green-600" : 
                      "text-amber-500"
                    }>
                      {stat.change}
                    </span>
                    <span>vs última hora</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Activity Chart */}
          <Card className="border shadow-clean">
            <CardHeader>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                Atividade ao Vivo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={realTimeData}>
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="requests" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.1}
                    strokeWidth={2}
                    name="Requisições"
                  />
                  <Area
                    type="monotone" 
                    dataKey="users" 
                    stroke="hsl(var(--accent))" 
                    fill="hsl(var(--accent))" 
                    fillOpacity={0.1}
                    strokeWidth={2}
                    name="Usuários"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemHealth.map((service, index) => (
              <Card key={service.name} className="border shadow-clean">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{service.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    {service.status === 'healthy' && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {service.status === 'warning' && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                    {service.status === 'error' && <XCircle className="h-4 w-4 text-red-500" />}
                    <Badge variant={service.status === 'healthy' ? 'default' : 'destructive'} className="text-xs">
                      {service.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tempo Online</span>
                      <span className="font-medium">{service.uptime}%</span>
                    </div>
                    <Progress value={service.uptime} className="h-1.5" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tempo de Resposta</span>
                      <span className="font-medium">{service.response}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resourceUsage.map((resource, index) => (
              <Card key={resource.name} className="border shadow-clean">
                <CardHeader>
                  <CardTitle className="text-sm font-medium">{resource.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Uso</span>
                      <span className="font-medium">{resource.value}%</span>
                    </div>
                    <Progress value={resource.value} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Ações Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card key={action.title} className="group cursor-pointer hover:scale-105 transition-spring shadow-card-custom hover:shadow-elegant animate-slide-in-right" style={{ animationDelay: `${index * 150}ms` }}>
              <Link to={action.href} className="block p-6">
                <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-spring`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-smooth">
                  {action.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {action.description}
                </p>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Atividade Recente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 p-3 rounded-lg bg-accent/10 border border-accent/20">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Novo model GPT-4 configurado</p>
              <p className="text-xs text-muted-foreground">2 minutos atrás</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Conexão do database atualizada</p>
              <p className="text-xs text-muted-foreground">15 minutos atrás</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary/20 border border-secondary/30">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Novo usuário registrado</p>
              <p className="text-xs text-muted-foreground">1 hora atrás</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}