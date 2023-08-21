import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  Checkbox,
  ListItemIcon,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Department {
  id: number;
  name: string;
  subDepartments?: Department[];
}

const hierarchicalData: Department[] = [
  {
    id: 1,
    name: "Department A",
    subDepartments: [
      {
        id: 11,
        name: "Sub Department A1",
      },
      {
        id: 12,
        name: "Sub Department A2",
      },
    ],
  },
  {
    id: 2,
    name: "Department B",
    subDepartments: [
      {
        id: 21,
        name: "Sub Department B1",
      },
      {
        id: 22,
        name: "Sub Department B2",
      },
    ],
  },
];

const DepartmentHierarchy: React.FC = () => {
  const [open, setOpen] = useState<number[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);

  const handleToggle = (id: number) => {
    if (open.includes(id)) {
      setOpen(open.filter((itemId) => itemId !== id));
    } else {
      setOpen([...open, id]);
    }
  };

  const handleDepartmentToggle = (id: number) => {
    setSelectedDepartments((prevSelected) => {
        const department = hierarchicalData.find((dept) => dept.id === id);
        let updatedSelected: number[];
  
        if (isAllSubDepartmentsSelected(department!)) {
          updatedSelected = prevSelected.filter((itemId) => itemId !== id);
        } else {
          updatedSelected = Array.from(
            new Set([...prevSelected, id, ...(department!.subDepartments || []).map(subDept => subDept.id)])
          );
        }
  
        return updatedSelected;
      });
  };

  const handleSubDepartmentToggle = (id: number, parentId: number) => {
    setSelectedDepartments((prevSelected) => {
      const updatedSelected = prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id];

      const allSubDepartmentsSelected = hierarchicalData
        .find((dept) => dept.id === parentId)
        ?.subDepartments?.every((subDept) =>
          updatedSelected.includes(subDept.id)
        );

      if (allSubDepartmentsSelected) {
        return updatedSelected.filter((itemId) => itemId !== parentId);
      } else {
        return updatedSelected;
      }
    });
  };

  const isDepartmentSelected = (department: Department) => {
    return selectedDepartments.includes(department.id);
  };

  const isAllSubDepartmentsSelected = (department: Department) => {
    return (
      department.subDepartments?.every((subDept) =>
        selectedDepartments.includes(subDept.id)
      ) || false
    );
  };

  return (
    <List>
      {" "}
      {hierarchicalData.map((department) => (
        <React.Fragment key={department.id}>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                edge="start"
                // Align the checkbox to the left
                checked={isDepartmentSelected(department)}
                indeterminate={isAllSubDepartmentsSelected(department)}
                onChange={() => handleDepartmentToggle(department.id)}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText primary={department.name} />
            <IconButton onClick={() => handleToggle(department.id)}>
              {open.includes(department.id) ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}{" "}
            </IconButton>
          </ListItem>
          <Collapse in={open.includes(department.id)}>
            {department.subDepartments?.map((subDepartment) => (
              <List key={subDepartment.id} component="div" disablePadding>
                <ListItem>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      // Align the checkbox to the left
                      checked={selectedDepartments.includes(subDepartment.id)}
                      onChange={() =>
                        handleSubDepartmentToggle(
                          subDepartment.id,
                          department.id
                        )
                      }
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDepartment.name} />
                </ListItem>
              </List>
            ))}{" "}
          </Collapse>
        </React.Fragment>
      ))}{" "}
    </List>
  );
};

export default DepartmentHierarchy;
