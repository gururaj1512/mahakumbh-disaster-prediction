import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  WbSunny as WeatherIcon,
  Landscape as EarthquakeIcon,
  Groups as CrowdIcon,
  DirectionsCar as TrafficIcon,
  EmergencyShareRounded,
  WbSunny,
} from '@mui/icons-material';
import { useData } from '../contexts/DataContext';
import WeatherWidget from '../components/widgets/WeatherWidget';
import EarthquakeWidget from '../components/widgets/EarthquakeWidget';
import CrowdWidget from '../components/widgets/CrowdWidget';
import TrafficWidget from '../components/widgets/TrafficWidget';
import AlertsWidget from '../components/widgets/AlertsWidget';
import RiskScoreWidget from '../components/widgets/RiskScoreWidget';
import SatelliteWidget from '../components/widgets/SatelliteWidget';

const Dashboard = () => {
  const { dashboardData, loading, error } = useData();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
        <Box
          sx={{
            width: { xs: 60, sm: 70, md: 80 },
            height: { xs: 60, sm: 70, md: 80 },
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF6B35 0%, #FF9800 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 'bold',
            margin: '0 auto 16px',
            boxShadow: '0 8px 30px rgba(255, 107, 53, 0.4)',
          }}
        >
          <EmergencyShareRounded sx={{ fontSize: 'inherit' }} />
        </Box>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', fontSize: { xs: '1.75rem', sm: '2.125rem', md: '3rem' } }}>
          Divine Protection Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' } }}>
          Sacred Monitoring & Safety Management for Mahakumbh
        </Typography>
      </Box>
      
      {/* Risk Score Section */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <RiskScoreWidget data={dashboardData.risk_score} />
        </Grid>
      </Grid>

      {/* Creative Dashboard Layout */}
      
      {/* Top Row - Key Metrics Cards */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="dashboard-card" sx={{ 
              background: 'linear-gradient(135deg, #FF6B35 0%, #FF9800 100%)',
              color: 'white',
              textAlign: 'center',
              py: 3,
              height: '100%'
            }}>
              <CardContent>
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {dashboardData.risk_score?.overall_score || 0}
                </Typography>
                <Typography variant="body1">Risk Score</Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  {dashboardData.risk_score?.risk_level || 'Low'} Risk
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card className="dashboard-card" sx={{ 
              background: 'linear-gradient(135deg, #D32F2F 0%, #F44336 100%)',
              color: 'white',
              textAlign: 'center',
              py: 3,
              height: '100%'
            }}>
              <CardContent>
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {(dashboardData.alerts?.alerts || dashboardData.alerts || []).filter(alert => alert.priority === 'critical').length || 0}
                </Typography>
                <Typography variant="body1">Critical Alerts</Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Immediate Action Required
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card className="dashboard-card" sx={{ 
              background: 'linear-gradient(135deg, #1976D2 0%, #42A5F5 100%)',
              color: 'white',
              textAlign: 'center',
              py: 3,
              height: '100%'
            }}>
              <CardContent>
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {dashboardData.crowd?.overall_metrics?.current_occupancy?.toLocaleString() || 0}
                </Typography>
                <Typography variant="body1">Current Crowd</Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  {dashboardData.crowd?.overall_metrics?.occupancy_percentage?.toFixed(1) || 0}% Capacity
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card className="dashboard-card" sx={{ 
              background: 'linear-gradient(135deg, #388E3C 0%, #66BB6A 100%)',
              color: 'white',
              textAlign: 'center',
              py: 3,
              height: '100%'
            }}>
              <CardContent>
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {dashboardData.traffic?.overall_conditions?.open_routes || 0}
                </Typography>
                <Typography variant="body1">Open Routes</Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Traffic Flow Normal
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Middle Row - Main Widgets in 3 Columns */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={3}>
          {/* Left Column - Weather & Earthquakes */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <WeatherWidget data={dashboardData.weather} />
              <EarthquakeWidget data={dashboardData.earthquakes} />
            </Box>
          </Grid>
          
          {/* Center Column - Alerts & Crowd */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <AlertsWidget data={dashboardData.alerts?.alerts || dashboardData.alerts || []} />
              <CrowdWidget data={dashboardData.crowd} />
            </Box>
          </Grid>
          
          {/* Right Column - Traffic & Satellite */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TrafficWidget data={dashboardData.traffic} />
              <SatelliteWidget data={dashboardData.satellite} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Bottom Row - Historical Data & Emergency Info */}
      <Box>
        <Grid container spacing={3}>
          {/* Historical Weather Data */}
          <Grid item xs={12} md={6}>
            <Card className="dashboard-card">
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                  <Typography variant="h6">Previous Weather Data</Typography>
                  <WbSunny color="primary" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                  <Box>
                    <Typography variant="h4" color="primary">24°C</Typography>
                    <Typography variant="body2" color="text.secondary">Yesterday</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4" color="warning.main">28°C</Typography>
                    <Typography variant="body2" color="text.secondary">2 Days Ago</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4" color="info.main">22°C</Typography>
                    <Typography variant="body2" color="text.secondary">3 Days Ago</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Emergency Contacts */}
          <Grid item xs={12} md={6}>
            <Card className="dashboard-card">
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                  <Typography variant="h6">Emergency Contacts</Typography>
                  <EmergencyShareRounded color="error" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                  <Box>
                    <Typography variant="h6" color="primary">+91-100</Typography>
                    <Typography variant="body2" color="text.secondary">Police</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" color="error">+91-101</Typography>
                    <Typography variant="body2" color="text.secondary">Fire</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" color="success">+91-102</Typography>
                    <Typography variant="body2" color="text.secondary">Ambulance</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* System Status & Summary */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mt: { xs: 2, md: 3 } }}>
        {/* System Status */}
        <Grid item xs={12} md={6}>
          <Card className="dashboard-card" sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Status
              </Typography>
              
              <Grid container spacing={{ xs: 1, sm: 2 }}>
                <Grid item xs={6} sm={6} md={6}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <WeatherIcon color="primary" />
                    <Box>
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Weather API</Typography>
                      <Chip 
                        label="Online" 
                        color="success" 
                        size="small" 
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={6} sm={6} md={6}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <EarthquakeIcon color="primary" />
                    <Box>
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Seismic Monitoring</Typography>
                      <Chip 
                        label="Online" 
                        color="success" 
                        size="small" 
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={6} sm={6} md={6}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CrowdIcon color="primary" />
                    <Box>
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Crowd Analytics</Typography>
                      <Chip 
                        label="Active" 
                        color="success" 
                        size="small" 
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={6} sm={6} md={6}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <TrafficIcon color="primary" />
                    <Box>
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Traffic Monitoring</Typography>
                      <Chip 
                        label="Online" 
                        color="success" 
                        size="small" 
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Dashboard Summary */}
        <Grid item xs={12} md={6}>
          <Card className="dashboard-card" sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Dashboard Summary
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="primary">
                      {dashboardData.risk_score?.overall_score || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Risk Score
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="error">
                      {(dashboardData.alerts?.alerts || dashboardData.alerts || []).filter(alert => alert.priority === 'critical').length || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Critical Alerts
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="warning.main">
                      {dashboardData.crowd?.overall_metrics?.occupancy_percentage?.toFixed(1) || 0}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Crowd Density
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="success">
                      {dashboardData.traffic?.overall_conditions?.open_routes || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Open Routes
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
