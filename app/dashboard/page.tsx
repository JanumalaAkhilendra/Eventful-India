'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LoadingSpinner from '@/components/loading-spinner';
import PageTransition from '@/components/page-transition';
import { useAppContext } from '@/contexts/app-context';
import { api } from '@/lib/api';
import { ArtistSubmission } from '@/lib/types';
import { Eye, Check, X, Filter, Calendar, Users, DollarSign, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export default function DashboardPage() {
  const { state, dispatch } = useAppContext();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Fetch submissions on component mount
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const submissions = await api.getSubmissions();
        dispatch({ type: 'SET_SUBMISSIONS', payload: submissions });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load submissions' });
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [dispatch]);

  const handleStatusChange = async (id: string, newStatus: 'approved' | 'rejected') => {
    try {
      await api.updateSubmissionStatus(id, newStatus);
      dispatch({ 
        type: 'UPDATE_SUBMISSION_STATUS', 
        payload: { id, status: newStatus } 
      });
      toast.success(`Application ${newStatus} successfully`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const filteredSubmissions = statusFilter === 'all' 
    ? state.submissions 
    : state.submissions.filter(s => s.status === statusFilter);

  const stats = {
    totalSubmissions: state.submissions.length,
    pendingSubmissions: state.submissions.filter(s => s.status === 'pending').length,
    approvedSubmissions: state.submissions.filter(s => s.status === 'approved').length,
    rejectedSubmissions: state.submissions.filter(s => s.status === 'rejected').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Manager Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Review and manage artist applications
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Submissions',
              value: stats.totalSubmissions,
              icon: Users,
              description: '+2 from last week',
              color: 'text-blue-600'
            },
            {
              title: 'Pending Review',
              value: stats.pendingSubmissions,
              icon: Calendar,
              description: 'Awaiting review',
              color: 'text-yellow-600'
            },
            {
              title: 'Approved',
              value: stats.approvedSubmissions,
              icon: Check,
              description: 'Ready for platform',
              color: 'text-green-600'
            },
            {
              title: 'Approval Rate',
              value: `${stats.totalSubmissions > 0 
                ? Math.round((stats.approvedSubmissions / stats.totalSubmissions) * 100)
                : 0}%`,
              icon: TrendingUp,
              description: 'This month',
              color: 'text-purple-600'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Submissions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Artist Submissions
                </CardTitle>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Fee Range</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission, index) => (
                      <motion.tr
                        key={submission.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b"
                      >
                        <TableCell className="font-medium">{submission.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {submission.category.slice(0, 2).map((cat) => (
                              <Badge key={cat} variant="secondary" className="text-xs">
                                {cat}
                              </Badge>
                            ))}
                            {submission.category.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{submission.category.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{submission.location}</TableCell>
                        <TableCell>{submission.feeRange}</TableCell>
                        <TableCell>
                          {new Date(submission.submittedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              submission.status === 'approved'
                                ? 'default'
                                : submission.status === 'rejected'
                                ? 'destructive'
                                : 'secondary'
                            }
                            className={
                              submission.status === 'approved'
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : submission.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                : ''
                            }
                          >
                            {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {submission.status === 'pending' && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleStatusChange(submission.id, 'approved')}
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleStatusChange(submission.id, 'rejected')}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredSubmissions.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-4">📋</div>
                  <h3 className="text-xl font-semibold mb-2">No submissions found</h3>
                  <p className="text-muted-foreground">
                    {statusFilter === 'all' 
                      ? 'No artist applications have been submitted yet.'
                      : `No ${statusFilter} submissions found.`
                    }
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
}