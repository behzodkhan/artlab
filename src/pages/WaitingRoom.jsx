import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function WaitingRoom() {
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [contributions, setContributions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch('https://artlab.pythonanywhere.com/api/contributions');
        if (!response.ok) {
          throw new Error('Failed to fetch contributions');
        }
        const data = await response.json();
        setContributions(data);
        console.log(contributions)
      } catch (error) {
        console.error('Error fetching contributions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContributions();
  }, []);

  const filteredContributions = contributions.filter(
    (contribution) =>
      contribution.name.toLowerCase().includes(filter.toLowerCase()) &&
      (statusFilter === 'all' || contribution.status === statusFilter)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center font-serif">
        Contribution Waiting Room
      </h1>
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Filter by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
        <Select onValueChange={setStatusFilter}>
          <SelectTrigger className="max-w-sm">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Under Review">Under Review</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <p className="text-center text-gray-500">Loading contributions...</p>
      ) : (
        <Table>
          <TableCaption>A list of your contributions and their current status.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContributions.length > 0 ? (
              filteredContributions.map((contribution) => (
                <TableRow key={contribution.id}>
                  <TableCell>{contribution.type}</TableCell>
                  <TableCell className="font-medium">{contribution.name}</TableCell>
                  <TableCell>{new Date(contribution.added_time).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${contribution.status === 'Approved' ? 'bg-green-100 text-green-800' : ''}
                        ${contribution.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${contribution.status === 'Under Review' ? 'bg-blue-100 text-blue-800' : ''}
                        ${contribution.status === 'Rejected' ? 'bg-red-100 text-red-800' : ''}
                      `}
                    >
                      {contribution.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No contributions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}