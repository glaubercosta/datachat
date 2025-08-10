import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  Brain,
  Clock,
  DollarSign,
  Zap
} from "lucide-react"
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function Analytics() {
  const usageData = [
    { date: '2024-01-01', requests: 1200, users: 45, cost: 156.80 },
    { date: '2024-01-02', requests: 1580, users: 52, cost: 203.40 },
    { date: '2024-01-03', requests: 1420, users: 48, cost: 184.60 },
    { date: '2024-01-04', requests: 1850, users: 61, cost: 241.50 },
    { date: '2024-01-05', requests: 2100, users: 68, cost: 273.00 },
    { date: '2024-01-06', requests: 1750, users: 55, cost: 227.50 },
    { date: '2024-01-07', requests: 1960, users: 63, cost: 254.80 }
  ]

  const modelUsage = [
    { name: 'GPT-4', value: 45, color: '#3b82f6' },
    { name: 'GPT-3.5', value: 30, color: '#10b981' },
    { name: 'Claude 3', value: 20, color: '#f59e0b' },
    { name: 'Others', value: 5, color: '#6b7280' }
  ]

  const hourlyData = [
    { hour: '00', requests: 45 },
    { hour: '02', requests: 35 },
    { hour: '04', requests: 25 },
    { hour: '06', requests: 55 },
    { hour: '08', requests: 180 },
    { hour: '10', requests: 250 },
    { hour: '12', requests: 320 },
    { hour: '14', requests: 280 },
    { hour: '16', requests: 240 },
    { hour: '18', requests: 190 },
    { hour: '20', requests: 150 },
    { hour: '22', requests: 85 }
  ]

  const stats = [
    {
      title: "Total Requests",
      value: "42,891",
      change: "+18%",
      icon: MessageSquare,
      color: "text-blue-500"
    },
    {
      title: "Active Users",
      value: "156",
      change: "+5%",
      icon: Users,
      color: "text-green-500"
    },
    {
      title: "Total Cost",
      value: "$1,247.80",
      change: "+12%",
      icon: DollarSign,
      color: "text-orange-500"
    },
    {
      title: "Avg Response Time",
      value: "1.2s",
      change: "-8%",
      icon: Clock,
      color: "text-purple-500"
    }
  ]

  const topUsers = [
    { name: 'John Doe', requests: 1247, cost: 162.11 },
    { name: 'Jane Smith', requests: 892, cost: 115.96 },
    { name: 'Mike Johnson', requests: 634, cost: 82.42 },
    { name: 'Sarah Wilson', requests: 521, cost: 67.73 },
    { name: 'Tom Brown', requests: 389, cost: 50.57 }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-gradient-primary">
          <BarChart3 className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your LLM usage and performance</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-smooth animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith('+') ? "text-green-500" : "text-red-500"}>
                  {stat.change}
                </span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Trend */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Usage Trend (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).getMonth() + 1 + '/' + new Date(value).getDate()}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="requests" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Model Usage Distribution */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-accent" />
              Model Usage Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={modelUsage}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}%`}
                >
                  {modelUsage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hourly Pattern */}
        <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-500" />
              Hourly Usage Pattern
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="hour" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="requests" 
                  fill="hsl(var(--accent))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Users */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-500" />
              Top Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topUsers.map((user, index) => (
                <div key={user.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.requests} requests</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    ${user.cost.toFixed(2)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-background/50 border border-border/50">
              <div className="text-2xl font-bold text-green-500 mb-1">99.8%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50 border border-border/50">
              <div className="text-2xl font-bold text-blue-500 mb-1">1.2s</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50 border border-border/50">
              <div className="text-2xl font-bold text-purple-500 mb-1">0.02%</div>
              <div className="text-sm text-muted-foreground">Error Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}